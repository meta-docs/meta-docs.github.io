import{_ as t,V as r,W as d,X as e,Y as n,Z as s,a1 as l,y as u}from"./framework.46148295.js";const a={},c=e("h1",{id:"spring-boot-异步调用-async",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#spring-boot-异步调用-async","aria-hidden":"true"},"#"),n(" Spring Boot 异步调用@Async")],-1),o={href:"https://blog.csdn.net/oo570741825/article/details/77768178",target:"_blank",rel:"noopener noreferrer"},v=l(`<p>过去使用spring3.x，很可能这样写一段代码执行一个异步的任务：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Autowired
ThreadPoolTaskExecutor executor;

public void dosomething() {
    executor.execute(new Runnable() {
        @Override
        public void run() {

        }
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在看看spring boot中是如何处理的： 1 首先通过<code>@EnableAsync</code>开启异步执行的功能，这可以放在springboot主类上，或者放在我们的配置类上。</p><p>2 配置自定义的线程池（如果不自定义的话，springboot会提供默认的）。 我这边是把<code>@EnableAsync</code>放在了自定义线程池的配置上。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Configuration
@EnableAsync
public class ExecutorConfig {

    @Bean
    public Executor firstExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix(&quot;firstExecutor-&quot;);
        executor.initialize();
        return executor;
    }

    @Bean
    public Executor secondExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(20);
        executor.setMaxPoolSize(100);
        executor.setQueueCapacity(20);
        executor.setThreadNamePrefix(&quot;secondExecutor-&quot;);
        executor.initialize();
        return executor;
    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这边配置了两个线程池，后面会知道如何指定使用的线程池。 注：一般生产中线程池参数往往会从配置文件中获取，获取方式可以看这篇文章：</p><p>3 配置执行类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
public class Task {

    @Async(&quot;firstExecutor&quot;)
    public Future&lt;String&gt; exec1() throws InterruptedException {
        System.out.println(Thread.currentThread().getName() + &quot; exec1 开始:&quot; + new Date());
        Thread.sleep(2000L);
        System.out.println(Thread.currentThread().getName() + &quot; exec1 结束:&quot; + new Date());
        return new AsyncResult&lt;&gt;(&quot;exec1&quot;);
    }

    @Async(&quot;secondExecutor&quot;)
    public Future&lt;String&gt; exec2() throws InterruptedException {
        System.out.println(Thread.currentThread().getName() + &quot; exec2 开始:&quot; + new Date());
        Thread.sleep(4000L);
        System.out.println(Thread.currentThread().getName() + &quot; exec2 结束:&quot; + new Date());
        return new AsyncResult&lt;&gt;(&quot;exec2&quot;);
    }

    @Async(&quot;secondExecutor&quot;)
    public Future&lt;String&gt; exec3() throws InterruptedException {
        System.out.println(Thread.currentThread().getName() + &quot; exec3 开始:&quot; + new Date());
        Thread.sleep(4000L);
        System.out.println(Thread.currentThread().getName() + &quot; exec3 结束:&quot; + new Date());
        return new AsyncResult&lt;&gt;(&quot;exec3&quot;);
    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4 测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RunWith(SpringRunner.class)
@SpringBootTest
public class ExecutorMynotesApplicationTests {

    @Autowired
    private Task task;

    @Test
    public void contextLoads() throws InterruptedException, ExecutionException {
        Future&lt;String&gt; future1 = task.exec1();
        Future&lt;String&gt; future2 = task.exec2();
        Future&lt;String&gt; future3 = task.exec3();
        future1.get();
        future2.get();
        future3.get();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>secondExecutor-1 exec2 开始:Fri Sep 01 10:02:37 CST 2017
firstExecutor-1 exec1 开始:Fri Sep 01 10:02:37 CST 2017
secondExecutor-2 exec3 开始:Fri Sep 01 10:02:37 CST 2017
firstExecutor-1 exec1 结束:Fri Sep 01 10:02:39 CST 2017
secondExecutor-2 exec3 结束:Fri Sep 01 10:02:41 CST 2017
secondExecutor-1 exec2 结束:Fri Sep 01 10:02:41 CST 2017

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java8以上版本可以使用<code>CompletableFuture</code></p>`,13),m={href:"https://www.cnblogs.com/ssslinppp/p/7461732.html",target:"_blank",rel:"noopener noreferrer"},b=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Override
    public void run(String... args) throws Exception {
        // Start the clock
        long start = System.currentTimeMillis();

        // Kick of multiple, asynchronous lookups
        CompletableFuture&lt;User&gt; page1 = gitHubLookupService.findUser(&quot;PivotalSoftware&quot;);
        CompletableFuture&lt;User&gt; page2 = gitHubLookupService.findUser(&quot;CloudFoundry&quot;);
        CompletableFuture&lt;User&gt; page3 = gitHubLookupService.findUser(&quot;Spring-Projects&quot;);

        // Wait until they are all done
        CompletableFuture.allOf(page1,page2,page3).join();

        // Print results, including elapsed time
        logger.info(&quot;Elapsed time: &quot; + (System.currentTimeMillis() - start));
        logger.info(&quot;--&gt; &quot; + page1.get());
        logger.info(&quot;--&gt; &quot; + page2.get());
        logger.info(&quot;--&gt; &quot; + page3.get());

    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function p(x,g){const i=u("ExternalLinkIcon");return r(),d("div",null,[c,e("blockquote",null,[e("p",null,[e("a",o,[n("https://blog.csdn.net/oo570741825/article/details/77768178"),s(i)])])]),v,e("blockquote",null,[e("p",null,[e("a",m,[n("https://www.cnblogs.com/ssslinppp/p/7461732.html"),s(i)])])]),b])}const q=t(a,[["render",p],["__file","async.html.vue"]]);export{q as default};
