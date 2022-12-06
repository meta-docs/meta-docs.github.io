import{_ as e,V as i,W as s,a1 as a}from"./framework.46148295.js";const d={},n=a(`<h1 id="git-配置ssh代理" tabindex="-1"><a class="header-anchor" href="#git-配置ssh代理" aria-hidden="true">#</a> Git 配置SSH代理</h1><h2 id="git-设置-http-https-socks5-协议的代理" tabindex="-1"><a class="header-anchor" href="#git-设置-http-https-socks5-协议的代理" aria-hidden="true">#</a> git 设置 http/https/socks5 协议的代理</h2><p>windows/mac/linux 通用设置</p><p>注意：具体端口要看代理开启的是哪个端口，一般 socks 是1080</p><h4 id="开启-http-协议代理" tabindex="-1"><a class="header-anchor" href="#开启-http-协议代理" aria-hidden="true">#</a> 开启 http 协议代理</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git config --global http.proxy &quot;http://127.0.0.1:1080&quot;
git config --global https.proxy &quot;http://127.0.0.1:1080&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="开启-socks5-协议代理" tabindex="-1"><a class="header-anchor" href="#开启-socks5-协议代理" aria-hidden="true">#</a> 开启 socks5 协议代理</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git config --global http.proxy &quot;socks5://127.0.0.1:1080&quot;
git config --global https.proxy &quot;socks5://127.0.0.1:1080&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="取消-http" tabindex="-1"><a class="header-anchor" href="#取消-http" aria-hidden="true">#</a> 取消 http</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git config --global --unset http.proxy
git config --global --unset https.proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mac-linux-设置-ssh-代理" tabindex="-1"><a class="header-anchor" href="#mac-linux-设置-ssh-代理" aria-hidden="true">#</a> mac/linux 设置 ssh 代理</h2><p>配置文件为： <code>~/.ssh/config</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 必须是 github.com
Host github.com
   HostName github.com
   User git
   # 走 socks5 代理
   ProxyCommand nc -v -x 127.0.0.1:1080 %h %p
   # 走 HTTP 代理
   # ProxyCommand nc -v -X connect -x 127.0.0.1:1080 %h %p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="windows-设置-ssh-代理" tabindex="-1"><a class="header-anchor" href="#windows-设置-ssh-代理" aria-hidden="true">#</a> windows 设置 ssh 代理</h2><p>配置文件同样是 ： <code>~/.ssh/config</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Host github.com
    HostName github.com
    User git
    # 走 socks5 协议
    # ProxyCommand connect -S 127.0.0.1:1080 %h %p
    # 走 http 协议
    ProxyCommand connect -H 127.0.0.1:1080 %h %p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h2><p>在设置 <code>http/https</code> 上，两者系统没有区别。</p><p>但是在设置 ssh 代理时，<code>git bash</code> 内置了 <code>connect</code> ，所以在 windows 中，使用的是 <code>connect</code> 。</p><p>而在 <code>mac</code> 或者 <code>linux</code> 上，执行 <code>connect</code> 找不到命令，取而代之的是 <code>nc</code> 所以两者的区别仅在于 <code>ProxyCommand</code> 后面使用的命令是不同的</p><div class="custom-container info"><p class="custom-container-title">相关信息</p><blockquote><p>目前网上许多的设置方法，仅仅标注了设置 ssh 代理的方法，并未标注平台，某些使用 linux ，某些使用 windows。导致有的设置不生效或报错 仅对设置方法做整合，以上设置都是自用的</p></blockquote></div><h3 id="配置gradle-代理" tabindex="-1"><a class="header-anchor" href="#配置gradle-代理" aria-hidden="true">#</a> 配置Gradle 代理</h3><p>修改gradle.properties配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>org.gradle.jvmargs=-DsocksProxyHost=127.0.0.1 -DsocksProxyPort=1080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,24),t=[n];function c(o,r){return i(),s("div",null,t)}const h=e(d,[["render",c],["__file","proxy.html.vue"]]);export{h as default};
