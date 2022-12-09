import{_ as l,V as a,W as d,X as e,Y as i,Z as s,a1 as r,y as t}from"./framework.46148295.js";const c={},v=e("h1",{id:"spring-自定义注解",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#spring-自定义注解","aria-hidden":"true"},"#"),i(" Spring 自定义注解")],-1),u={href:"https://mp.weixin.qq.com/s/tKE04PqreCQDdM2oQ79REQ",target:"_blank",rel:"noopener noreferrer"},m=r(`<ul><li>字段注解 <ul><li>自定义注解</li><li>验证器类</li><li>使用方式</li><li>测试</li></ul></li><li>方法、类注解 <ul><li>权限注解</li><li>缓存注解</li></ul></li></ul><hr><p>在业务开发过程中我们会遇到形形色色的注解，但是框架自有的注解并不是总能满足复杂的业务需求，我们可以自定义注解来满足我们的需求。根据注解使用的位置，文章将分成字段注解、方法、类注解来介绍自定义注解</p><hr><h2 id="字段注解" tabindex="-1"><a class="header-anchor" href="#字段注解" aria-hidden="true">#</a> 字段注解</h2><p>字段注解一般是用于校验字段是否满足要求，hibernate-validate依赖就提供了很多校验注解 ，如 <code>@NotNull</code>、<code>@Range</code>等，但是这些注解并不是能够满足所有业务场景的。比如我们希望传入的参数在指定的String集合中，那么已有的注解就不能满足需求了，需要自己实现。</p><h5 id="自定义注解" tabindex="-1"><a class="header-anchor" href="#自定义注解" aria-hidden="true">#</a> 自定义注解</h5><p>定义一个<code>@Check</code>注解，通过<code>@interface</code>声明一个注解</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Target({ ElementType.FIELD})
//只允许用在类的字段上
@Retention(RetentionPolicy.RUNTIME)
//注解保留在程序运行期间，此时可以通过反射获得定义在某个类上的所有注解
@Constraint(validatedBy = ParamConstraintValidated.class)
public @interface Check {
    /**
     * 合法的参数值
     **/
    String[] paramValues();

    /**
     * 提示信息
     **/
    String message() default &quot;参数不为指定值&quot;;

    Class&lt;?&gt;[] groups() default {};

    Class&lt;? extends Payload&gt;[] payload() default {};
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Target 定义注解的使用位置，用来说明该注解可以被声明在那些元素之前。</p><ul><li>ElementType.TYPE：说明该注解只能被声明在一个类前。</li><li>ElementType.FIELD：说明该注解只能被声明在一个类的字段前。</li><li>ElementType.METHOD：说明该注解只能被声明在一个类的方法前。</li><li>ElementType.PARAMETER：说明该注解只能被声明在一个方法参数前。</li><li>ElementType.CONSTRUCTOR：说明该注解只能声明在一个类的构造方法前。</li><li>ElementType.LOCAL_VARIABLE：说明该注解只能声明在一个局部变量前。</li><li>ElementType.ANNOTATION_TYPE：说明该注解只能声明在一个注解类型前。</li><li>ElementType.PACKAGE：说明该注解只能声明在一个包名前</li></ul><p>@Constraint 通过使用validatedBy来指定与注解关联的验证器</p><p>@Retention用来说明该注解类的生命周期。</p><ul><li>RetentionPolicy.SOURCE: 注解只保留在源文件中</li><li>RetentionPolicy.CLASS : 注解保留在class文件中，在加载到JVM虚拟机时丢弃</li><li>RetentionPolicy.RUNTIME: 注解保留在程序运行期间，此时可以通过反射获得定义在某个类上的所有注解。</li></ul><h5 id="验证器类" tabindex="-1"><a class="header-anchor" href="#验证器类" aria-hidden="true">#</a> 验证器类</h5><p>验证器类需要实现ConstraintValidator泛型接口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ParamConstraintValidated implements ConstraintValidator&lt;Check, Object&gt; {
    /**
     * 合法的参数值，从注解中获取
     * */
    private List&lt;String&gt; paramValues;

    @Override
    public void initialize(Check constraintAnnotation) {
        //初始化时获取注解上的值
        paramValues = Arrays.asList(constraintAnnotation.paramValues());
    }

    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (paramValues.contains(o)) {
            return true;
        }

        //不在指定的参数列表中
        return false;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个泛型参数类型Check：注解，第二个泛型参数Object：校验字段类型。需要实现initialize和isValid方法，isValid方法为校验逻辑，initialize方法初始化工作</p><h5 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式</h5><p>定义一个实体类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
public class User {
    /**
     * 姓名
     * */
    private String name;

    /**
     * 性别 man or women
     * */
    @Check(paramValues = {&quot;man&quot;, &quot;woman&quot;})
    private String sex;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对sex字段加校验，其值必须为woman或者man</p><h5 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController(&quot;/api/test&quot;)
public class TestController {
    @PostMapping
    public Object test(@Validated @RequestBody User user) {
        return &quot;hello world&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意需要在User对象上加上@Validated注解，这里也可以使用@Valid注解</p><hr><h3 id="方法、类注解" tabindex="-1"><a class="header-anchor" href="#方法、类注解" aria-hidden="true">#</a> 方法、类注解</h3><p>在开发过程中遇到过这样的需求，如只有有权限的用户的才能访问这个类中的方法或某个具体的方法、查找数据的时候先不从数据库查找，先从guava cache中查找，在从redis查找，最后查找mysql（多级缓存）。</p><p>这时候我们可以自定义注解去完成这个要求，第一个场景就是定义一个权限校验的注解，第二个场景就是定义spring-data-redis包下类似@Cacheable的注解。</p><h4 id="权限注解" tabindex="-1"><a class="header-anchor" href="#权限注解" aria-hidden="true">#</a> 权限注解</h4><h5 id="自定义注解-1" tabindex="-1"><a class="header-anchor" href="#自定义注解-1" aria-hidden="true">#</a> 自定义注解</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Target({ ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PermissionCheck {
    /**
     * 资源key
     * */
    String resourceKey();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该注解的作用范围为类或者方法上</p><h5 id="拦截器类" tabindex="-1"><a class="header-anchor" href="#拦截器类" aria-hidden="true">#</a> 拦截器类</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class PermissionCheckInterceptor extends HandlerInterceptorAdapter {
    /**
     * 处理器处理之前调用
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws Exception {
        HandlerMethod handlerMethod = (HandlerMethod)handler;
        PermissionCheck permission = findPermissionCheck(handlerMethod);

        //如果没有添加权限注解则直接跳过允许访问
        if (permission == null) {
            return true;
        }

        //获取注解中的值
        String resourceKey = permission.resourceKey();

        //TODO 权限校验一般需要获取用户信息，通过查询数据库进行权限校验
        //TODO 这里只进行简单演示，如果resourceKey为testKey则校验通过，否则不通过
        if (&quot;testKey&quot;.equals(resourceKey)) {
            return true;
        }

        return false;
    }

    /**
     * 根据handlerMethod返回注解信息
     *
     * @param handlerMethod 方法对象
     * @return PermissionCheck注解
     */
    private PermissionCheck findPermissionCheck(HandlerMethod handlerMethod) {
        //在方法上寻找注解
        PermissionCheck permission = handlerMethod.getMethodAnnotation(PermissionCheck.class);
        if (permission == null) {
            //在类上寻找注解
            permission = handlerMethod.getBeanType().getAnnotation(PermissionCheck.class);
        }

        return permission;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>权限校验的逻辑就是你有权限你就可以访问，没有就不允许访问，本质其实就是一个拦截器。我们首先需要拿到注解，然后获取注解上的字段进行校验，校验通过返回true，否则返回false</p><h5 id="测试-1" tabindex="-1"><a class="header-anchor" href="#测试-1" aria-hidden="true">#</a> 测试</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@GetMapping(&quot;/api/test&quot;)
 @PermissionCheck(resourceKey = &quot;test&quot;)
 public Object testPermissionCheck() {
     return &quot;hello world&quot;;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法需要进行权限校验所以添加了PermissionCheck注解</p><h4 id="缓存注解" tabindex="-1"><a class="header-anchor" href="#缓存注解" aria-hidden="true">#</a> 缓存注解</h4><h5 id="自定义注解-2" tabindex="-1"><a class="header-anchor" href="#自定义注解-2" aria-hidden="true">#</a> 自定义注解</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Target({ ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomCache {
    /**
     * 缓存的key值
     * */
    String key();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注解可以用在方法或类上，但是缓存注解一般是使用在方法上的</p><h5 id="切面" tabindex="-1"><a class="header-anchor" href="#切面" aria-hidden="true">#</a> 切面</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Aspect
@Component
public class CustomCacheAspect {
    /**
     * 在方法执行之前对注解进行处理
     *
     * @param pjd
     * @param customCache 注解
     * @return 返回中的值
     * */
    @Around(&quot;@annotation(com.cqupt.annotation.CustomCache) &amp;&amp; @annotation(customCache)&quot;)
    public Object dealProcess(ProceedingJoinPoint pjd, CustomCache customCache) {
        Object result = null;

        if (customCache.key() == null) {
            //TODO throw error
        }

        //TODO 业务场景会比这个复杂的多，会涉及参数的解析如key可能是#{id}这些，数据查询
        //TODO 这里做简单演示，如果key为testKey则返回hello world
        if (&quot;testKey&quot;.equals(customCache.key())) {
            return &quot;hello word&quot;;
        }

        //执行目标方法
        try {
            result = pjd.proceed();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }

        return result;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为缓存注解需要在方法执行之前有返回值，所以没有通过拦截器处理这个注解，而是通过使用切面在执行方法之前对注解进行处理。如果注解没有返回值，将会返回方法中的值</p><h5 id="测试-2" tabindex="-1"><a class="header-anchor" href="#测试-2" aria-hidden="true">#</a> 测试</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@GetMapping(&quot;/api/cache&quot;)
@CustomCache(key = &quot;test&quot;)
public Object testCustomCache() {
    return &quot;don&#39;t hit cache&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48),o={href:"https://github.com/TiantianUpup/custom-annotation",target:"_blank",rel:"noopener noreferrer"};function b(h,p){const n=t("ExternalLinkIcon");return a(),d("div",null,[v,e("p",null,[e("a",u,[i("Spring 自定义注解从入门到精通"),s(n)])]),m,e("p",null,[e("a",o,[i("源码"),s(n)])])])}const x=l(c,[["render",b],["__file","annotation.html.vue"]]);export{x as default};
