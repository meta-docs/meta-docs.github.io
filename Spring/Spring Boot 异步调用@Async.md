# Spring Boot 异步调用@Async

> https://blog.csdn.net/oo570741825/article/details/77768178

过去使用spring3.x，很可能这样写一段代码执行一个异步的任务：

```
@Autowired
ThreadPoolTaskExecutor executor;

public void dosomething() {
    executor.execute(new Runnable() {
        @Override
        public void run() {

        }
    });
}
```
现在看看spring boot中是如何处理的： 
1 首先通过`@EnableAsync`开启异步执行的功能，这可以放在springboot主类上，或者放在我们的配置类上。 
 
2 配置自定义的线程池（如果不自定义的话，springboot会提供默认的）。 
我这边是把`@EnableAsync`放在了自定义线程池的配置上。


```
@Configuration
@EnableAsync
public class ExecutorConfig {

    @Bean
    public Executor firstExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix("firstExecutor-");
        executor.initialize();
        return executor;
    }

    @Bean
    public Executor secondExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(20);
        executor.setMaxPoolSize(100);
        executor.setQueueCapacity(20);
        executor.setThreadNamePrefix("secondExecutor-");
        executor.initialize();
        return executor;
    }

}

```
这边配置了两个线程池，后面会知道如何指定使用的线程池。 
注：一般生产中线程池参数往往会从配置文件中获取，获取方式可以看这篇文章： 

3 配置执行类


```
@Component
public class Task {

    @Async("firstExecutor")
    public Future<String> exec1() throws InterruptedException {
        System.out.println(Thread.currentThread().getName() + " exec1 开始:" + new Date());
        Thread.sleep(2000L);
        System.out.println(Thread.currentThread().getName() + " exec1 结束:" + new Date());
        return new AsyncResult<>("exec1");
    }

    @Async("secondExecutor")
    public Future<String> exec2() throws InterruptedException {
        System.out.println(Thread.currentThread().getName() + " exec2 开始:" + new Date());
        Thread.sleep(4000L);
        System.out.println(Thread.currentThread().getName() + " exec2 结束:" + new Date());
        return new AsyncResult<>("exec2");
    }

    @Async("secondExecutor")
    public Future<String> exec3() throws InterruptedException {
        System.out.println(Thread.currentThread().getName() + " exec3 开始:" + new Date());
        Thread.sleep(4000L);
        System.out.println(Thread.currentThread().getName() + " exec3 结束:" + new Date());
        return new AsyncResult<>("exec3");
    }

}

```

4 测试


```
@RunWith(SpringRunner.class)
@SpringBootTest
public class ExecutorMynotesApplicationTests {

    @Autowired
    private Task task;

    @Test
    public void contextLoads() throws InterruptedException, ExecutionException {
        Future<String> future1 = task.exec1();
        Future<String> future2 = task.exec2();
        Future<String> future3 = task.exec3();
        future1.get();
        future2.get();
        future3.get();
    }

}
```

执行结果：
```
secondExecutor-1 exec2 开始:Fri Sep 01 10:02:37 CST 2017
firstExecutor-1 exec1 开始:Fri Sep 01 10:02:37 CST 2017
secondExecutor-2 exec3 开始:Fri Sep 01 10:02:37 CST 2017
firstExecutor-1 exec1 结束:Fri Sep 01 10:02:39 CST 2017
secondExecutor-2 exec3 结束:Fri Sep 01 10:02:41 CST 2017
secondExecutor-1 exec2 结束:Fri Sep 01 10:02:41 CST 2017

```

Java8以上版本可以使用`CompletableFuture`
> https://www.cnblogs.com/ssslinppp/p/7461732.html
```
@Override
    public void run(String... args) throws Exception {
        // Start the clock
        long start = System.currentTimeMillis();

        // Kick of multiple, asynchronous lookups
        CompletableFuture<User> page1 = gitHubLookupService.findUser("PivotalSoftware");
        CompletableFuture<User> page2 = gitHubLookupService.findUser("CloudFoundry");
        CompletableFuture<User> page3 = gitHubLookupService.findUser("Spring-Projects");

        // Wait until they are all done
        CompletableFuture.allOf(page1,page2,page3).join();

        // Print results, including elapsed time
        logger.info("Elapsed time: " + (System.currentTimeMillis() - start));
        logger.info("--> " + page1.get());
        logger.info("--> " + page2.get());
        logger.info("--> " + page3.get());

    }
```

