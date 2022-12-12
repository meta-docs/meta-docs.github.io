import{_ as s,V as d,W as r,X as e,Y as n,Z as l,a1 as i,y as o}from"./framework.46148295.js";const t="/assets/image-20220602105845959.78e69459.png",c="/assets/image-20220602114547431.2bd2bbeb.png",p="/assets/image-20220602110113925.febdac19.png",u="/assets/image-20220602110219179.3d0d3208.png",v="/assets/image-20220602110544031.b1c23fdc.png",b={},m=i('<h1 id="docker部署springboot项目" tabindex="-1"><a class="header-anchor" href="#docker部署springboot项目" aria-hidden="true">#</a> Docker部署SpringBoot项目</h1><h2 id="_1-dockerfile" tabindex="-1"><a class="header-anchor" href="#_1-dockerfile" aria-hidden="true">#</a> 1 Dockerfile</h2><p>todo...</p><h2 id="_2-idea-使用-docker-插件" tabindex="-1"><a class="header-anchor" href="#_2-idea-使用-docker-插件" aria-hidden="true">#</a> 2 Idea 使用 Docker 插件</h2><h3 id="_2-1-安装插件" tabindex="-1"><a class="header-anchor" href="#_2-1-安装插件" aria-hidden="true">#</a> 2.1 安装插件</h3><p>企业版 idea 最新版本默认已经安装了 Docker，如果没有的，同学们自行下载安装。</p><p><img src="'+t+`" alt="image-20220602105845959" loading="lazy"></p><h3 id="_2-2-连接-docker" tabindex="-1"><a class="header-anchor" href="#_2-2-连接-docker" aria-hidden="true">#</a> 2.2 连接 Docker</h3><p>此时我们就可以在 idea 中管理 docker 啦</p><h2 id="_3-在docker中部署spring-boot应用" tabindex="-1"><a class="header-anchor" href="#_3-在docker中部署spring-boot应用" aria-hidden="true">#</a> 3 在Docker中部署Spring Boot应用</h2><p>本地开发过程中，我们可以选择手动编写 Dockerfile，生成镜像；也可以通过 Gradle 插件，帮我们自动执行。</p><h3 id="_3-1-编写dockfile" tabindex="-1"><a class="header-anchor" href="#_3-1-编写dockfile" aria-hidden="true">#</a> 3.1：编写Dockfile</h3><p>首先build，生成jar包</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token punctuation">.</span>\\gradlew clean build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>项目根目录下新建 Dockerfile 文件，官方推荐文件名称就叫 Dockerfile，算是一种约定，安装 Docker 插件后，会有关键字提示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM openjdk:8-jdk-alpine
VOLUME [&quot;/tmp&quot;, &quot;/nfs&quot;]
 
ENV LANG C.UTF-8
ENV TIMEZONE Asia/Shanghai
 
ARG JAR_FILE=build/libs/*.jar
COPY \${JAR_FILE} app.jar
ENTRYPOINT [&quot;sh&quot;, &quot;-c&quot;, &quot;java \${JAVA_OPTS} -jar /app.jar \${0} \${@}&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+`" alt="image-20220602114547431" loading="lazy"></p><p>点击run，可以看到他会为我们自动构建image，并运行容器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Deploying &#39;order-app Dockerfile: Dockerfile&#39;…
Building image…
Preparing build context archive…
[==================================================&gt;]3938/3938 files
Done
 
Sending build context to Docker daemon…
[==================================================&gt;] 210.2MB
Done
 
Step 1/7 : FROM openjdk:8-jdk-alpine
 ---&gt; a3562aa0b991
Step 2/7 : VOLUME [&quot;/tmp&quot;, &quot;/nfs&quot;]
 ---&gt; Running in c8279f5a3858
Removing intermediate container c8279f5a3858
 ---&gt; b8e7893624d6
Step 3/7 : ENV LANG C.UTF-8
 ---&gt; Running in ae5b7ae96591
Removing intermediate container ae5b7ae96591
 ---&gt; 4a98f6269e05
Step 4/7 : ENV TIMEZONE Asia/Shanghai
 ---&gt; Running in 5d7d95c9e07f
Removing intermediate container 5d7d95c9e07f
 ---&gt; 123c3a57d845
Step 5/7 : ARG JAR_FILE=build/libs/*.jar
 ---&gt; Running in adbc039bb2f0
Removing intermediate container adbc039bb2f0
 ---&gt; e5e9ef998df0
Step 6/7 : COPY \${JAR_FILE} app.jar
 ---&gt; 1e5333a4646a
Step 7/7 : ENTRYPOINT [&quot;sh&quot;, &quot;-c&quot;, &quot;java \${JAVA_OPTS} -jar /app.jar \${0} \${@}&quot;]
 ---&gt; Running in 822d316d2bea
Removing intermediate container 822d316d2bea
 ---&gt; cbf3df2c9b35
 
Successfully built cbf3df2c9b35
Successfully tagged order-app:1.0
Creating container…
Container Id: 11dd16732a7b9f056988f0a28acee5181239f52687a68b8887a654fb654da85c
Container name: &#39;order-app&#39;
Starting container &#39;order-app&#39;
&#39;order-app Dockerfile: Dockerfile&#39; has been deployed successfully.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看日志，默认情况下是没有展示log 这个tab，在Dashboard下，选择 show log，可以看到已经启动成功。</p><p><img src="`+p+'" alt="image-20220602110113925" loading="lazy"></p><p><img src="'+u+'" alt="image-20220602110219179" loading="lazy"></p><h3 id="_3-2-gradle-插件" tabindex="-1"><a class="header-anchor" href="#_3-2-gradle-插件" aria-hidden="true">#</a> 3.2：Gradle 插件</h3>',23),g={href:"https://bmuschko.github.io/gradle-docker-plugin/",target:"_blank",rel:"noopener noreferrer"},h=i(`<p>该插件可以为我们一键生成 Dockerfile、build 并生成镜像。</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;com.bmuschko.docker-spring-boot-application&#39;</span> version <span class="token string">&#39;6.7.0&#39;</span>
<span class="token punctuation">}</span>
docker <span class="token punctuation">{</span>
    springBootApplication <span class="token punctuation">{</span>
        baseImage <span class="token operator">=</span> <span class="token string">&#39;openjdk:8-jdk-alpine&#39;</span>
        maintainer <span class="token operator">=</span> <span class="token string">&#39;fangtao&#39;</span>
        images <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;order-app:1.2&#39;</span><span class="token punctuation">]</span>
        jvmArgs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;-Duser.timezone=Asia/Shanghai&quot;</span></span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+v+'" alt="image-20220602110544031" loading="lazy"></p><h2 id="思考点" tabindex="-1"><a class="header-anchor" href="#思考点" aria-hidden="true">#</a> 思考点</h2><ol><li>如何接入k8s环境，是否可以本地启动容器接入</li><li>web 项目，当前是通过 nginx 配置代理到开发机器，容器化后，如何访问</li><li>本地联调，feign 调用app项目，如何指定节点或 ip</li></ol>',5);function k(f,_){const a=o("ExternalLinkIcon");return d(),r("div",null,[m,e("p",null,[n("参考文档："),e("a",g,[n("Gradle Docker Plugin User Guide & Examples (bmuschko.github.io)"),l(a)])]),h])}const D=s(b,[["render",k],["__file","02-deploy-spring-boot-project.html.vue"]]);export{D as default};
