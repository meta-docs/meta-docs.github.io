import{_ as n,V as s,W as a,a1 as t}from"./framework.46148295.js";const e={},p=t(`<h1 id="gradle-version-catalog-说明" tabindex="-1"><a class="header-anchor" href="#gradle-version-catalog-说明" aria-hidden="true">#</a> Gradle Version Catalog 说明</h1><h2 id="作为平台公共依赖" tabindex="-1"><a class="header-anchor" href="#作为平台公共依赖" aria-hidden="true">#</a> 作为平台公共依赖</h2><p>Gradle 7.x 版本提供了 version catalog 插件用于声明版本目录，可用于替代maven bom。</p><h3 id="提供目录" tabindex="-1"><a class="header-anchor" href="#提供目录" aria-hidden="true">#</a> 提供目录</h3><p><code>settings.gradle</code>文件不需要做额外修改，<code>build.gradle</code> 文件如下</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    <span class="token comment">// Gradle 提供的一个版本目录插件，它提供了声明、发布目录的能力</span>
    id <span class="token string">&#39;version-catalog&#39;</span>
    <span class="token comment">// 用于发布到 nexus</span>
    id <span class="token string">&#39;maven-publish&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义目录</span>
catalog <span class="token punctuation">{</span>
    <span class="token comment">// declare the aliases, bundles and versions in this block</span>
    versionCatalog <span class="token punctuation">{</span>
        <span class="token comment">// 声明依赖库，组成方式 library(&#39;别名&#39;, &#39;group&#39;, &#39;artifact&#39;).version(&#39;version&#39;);</span>
        <span class="token comment">// 别名必须包含由短横线 (- ，推荐)、下划线(_)或点(.)分隔的标识符，标识符本身必须由 ascii 字符组成，最好是小写字母，最后是数字。</span>
        <span class="token comment">// version 声明具体的版本号</span>
        <span class="token comment">// versionRef 引用 version() 中声明的版本号，可以用来声明一组具有相同的版本号的依赖库</span>
        <span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;groovy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;3.0.5&#39;</span><span class="token punctuation">)</span>
        <span class="token function">library</span><span class="token punctuation">(</span><span class="token string">&#39;commons-lang3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;org.apache.commons&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;commons-lang3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;3.9&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">library</span><span class="token punctuation">(</span><span class="token string">&#39;groovy-core&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;org.codehaus.groovy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;groovy&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">versionRef</span><span class="token punctuation">(</span><span class="token string">&#39;groovy&#39;</span><span class="token punctuation">)</span>
        <span class="token function">library</span><span class="token punctuation">(</span><span class="token string">&#39;groovy-json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;org.codehaus.groovy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;groovy-json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">versionRef</span><span class="token punctuation">(</span><span class="token string">&#39;groovy&#39;</span><span class="token punctuation">)</span>
        <span class="token function">library</span><span class="token punctuation">(</span><span class="token string">&#39;groovy-nio&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;org.codehaus.groovy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;groovy-nio&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">versionRef</span><span class="token punctuation">(</span><span class="token string">&#39;groovy&#39;</span><span class="token punctuation">)</span>
        <span class="token function">library</span><span class="token punctuation">(</span><span class="token string">&#39;hutool-core&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;cn.hutool&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hutool-core&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;5.8.9&#39;</span><span class="token punctuation">)</span>
        

        <span class="token comment">// Spring 提供的一些 Bom，引入了一组依赖，但用的是Maven方式</span>
        <span class="token comment">// 使用时通过，同样不需要声明版本 </span>
        <span class="token comment">// implementation &#39;org.springframework.boot:spring-boot-starter-web&#39;</span>
        <span class="token function">library</span><span class="token punctuation">(</span><span class="token string">&#39;spring-boot-dependencies&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;org.springframework.boot&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;spring-boot-dependencies&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;2.7.5&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">library</span><span class="token punctuation">(</span><span class="token string">&#39;spring-cloud-alibaba-dependencies&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;com.alibaba.cloud&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;spring-cloud-alibaba-dependencies&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;2021.0.4.0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 声明插件</span>
        <span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">&#39;sonarqube&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;org.sonarqube&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;3.0&#39;</span><span class="token punctuation">)</span>
        <span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">&#39;spring-boot&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;org.springframework.boot&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;2.7.5&#39;</span><span class="token punctuation">)</span>
        <span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">&#39;spring-dependency-management&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;io.spring.dependency-management&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&#39;1.0.15.RELEASE&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

publishing <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        maven <span class="token punctuation">{</span>
            name <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;nexus-xxx&quot;</span></span>
            url <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;https://nexus.xxx.com/repository/releases/&quot;</span></span>
            credentials <span class="token punctuation">{</span>
                username <span class="token operator">=</span> <span class="token string">&#39;xxx&#39;</span>
                password <span class="token operator">=</span> <span class="token string">&#39;xxxxx&#39;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    publications <span class="token punctuation">{</span>
        <span class="token function">maven</span><span class="token punctuation">(</span>MavenPublication<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            from components<span class="token punctuation">.</span>versionCatalog
            groupId <span class="token operator">=</span> <span class="token string">&#39;com.skycoresaas.arch&#39;</span>
            artifactId <span class="token operator">=</span> <span class="token string">&#39;xxx-dependencies&#39;</span>
            version <span class="token operator">=</span> <span class="token string">&#39;1.0.0&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置好后作为一个项目发布到Maven仓库（Nexus），publish 会自动生成一个<code>toml</code>文件，即可被其他项目引用。</p><h3 id="使用目录" tabindex="-1"><a class="header-anchor" href="#使用目录" aria-hidden="true">#</a> 使用目录</h3><p><code>settings.gradle</code> 完整配置</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>dependencyResolutionManagement <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token interpolation-string"><span class="token string">&quot;https://nexus.xxxx.com/repository/releases/&quot;</span></span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/public&#39;</span> <span class="token punctuation">}</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token interpolation-string"><span class="token string">&quot;https://repo.spring.io/plugins-release&quot;</span></span> <span class="token punctuation">}</span>
        <span class="token function">gradlePluginPortal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    versionCatalogs <span class="token punctuation">{</span>
        libs <span class="token punctuation">{</span>
            <span class="token function">from</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;com.skycoresaas.arch:skycore-dependencies:1.0.0&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>build.gradle</code> 完整配置</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;java&#39;</span>
    id <span class="token string">&#39;java-library&#39;</span>
    <span class="token function">alias</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>boot<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

group <span class="token operator">=</span> <span class="token string">&#39;group_name&#39;</span>
version <span class="token operator">=</span> <span class="token string">&#39;0.0.1-SNAPSHOT&#39;</span>
sourceCompatibility <span class="token operator">=</span> <span class="token string">&#39;17&#39;</span>


dependencies <span class="token punctuation">{</span>
    <span class="token comment">// catalog中声明的依赖，使用别名的方式引入，idea 2022.3之后的版本会有智能提示</span>
    implementation libs<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>core
    implementation platform <span class="token punctuation">(</span>libs<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>dependencies<span class="token punctuation">)</span>
    implementation platform <span class="token punctuation">(</span>libs<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>dependencies<span class="token punctuation">)</span>
    <span class="token comment">// spring-boot-dependencies 2.7.5版本还是以Maven Bom形式声明的依赖，使用方式如下</span>
    implementation <span class="token string">&#39;com.google.code.gson:gson&#39;</span>
    implementation <span class="token string">&#39;org.apache.commons:commons-lang3&#39;</span>
    implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-web&#39;</span>
    testImplementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-test&#39;</span>
    testImplementation <span class="token string">&#39;org.springframework.security:spring-security-test&#39;</span>
<span class="token punctuation">}</span>

tasks<span class="token punctuation">.</span><span class="token function">named</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="仅在项目内使用" tabindex="-1"><a class="header-anchor" href="#仅在项目内使用" aria-hidden="true">#</a> 仅在项目内使用</h2><p>version catalog 改为在 <code>settings.gradle</code> 中配置，语法上和上面一致</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>dependencyResolutionManagement <span class="token punctuation">{</span>
    versionCatalogs <span class="token punctuation">{</span>
        libs <span class="token punctuation">{</span>
            <span class="token punctuation">...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),i=[p];function o(c,l){return s(),a("div",null,i)}const r=n(e,[["render",o],["__file","version_catalog.html.vue"]]);export{r as default};
