import{_ as r,V as o,W as l,X as n,Y as e,Z as i,a1 as s,y as t}from"./framework.46148295.js";const d="/assets/image-20220602111702025.c6f5894b.png",c="/assets/image2022-5-14_17-0-7.fc324b62.png",u="/assets/image-20220602135507215.b6ebb02a.png",v={},m=s('<h1 id="安装-docker-desktop" tabindex="-1"><a class="header-anchor" href="#安装-docker-desktop" aria-hidden="true">#</a> 安装 Docker Desktop</h1><h2 id="_1-windows-安装-docker" tabindex="-1"><a class="header-anchor" href="#_1-windows-安装-docker" aria-hidden="true">#</a> 1 Windows 安装 Docker</h2><h3 id="_1-1-下载并安装-docker" tabindex="-1"><a class="header-anchor" href="#_1-1-下载并安装-docker" aria-hidden="true">#</a> 1.1 下载并安装 Docker</h3>',3),p={href:"https://docs.docker.com/desktop/windows/install/",target:"_blank",rel:"noopener noreferrer"},b=s('<p>系统要求：</p><p><img src="'+d+'" alt="image-20220602111702025" loading="lazy"></p><p>查看系统版本：win+r 输入winver</p><p>注意最后一行需要<strong>安装 WSL2 Linux 内核更新包</strong>，否则运行Docker Desktop会遇到以下错误</p><p><img src="'+c+`" alt="image2022-5-14_17-0-7" loading="lazy"></p><h3 id="_1-2-验证-docker-是否安装成功" tabindex="-1"><a class="header-anchor" href="#_1-2-验证-docker-是否安装成功" aria-hidden="true">#</a> 1.2 验证 Docker 是否安装成功</h3><p>命令行输入：<code>docker version</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>C:\\Users\\DELL&gt;docker version
Client:
 Cloud integration: v1.0.24
 Version:           20.10.14
 API version:       1.41
 Go version:        go1.16.15
 Git commit:        a224086
 Built:             Thu Mar 24 01:53:11 2022
 OS/Arch:           windows/amd64
 Context:           default
 Experimental:      true
 
Server: Docker Desktop 4.8.1 (78998)
 Engine:
  Version:          20.10.14
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.16.15
  Git commit:       87a90dc
  Built:            Thu Mar 24 01:46:14 2022
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.5.11
  GitCommit:        3df54a852345ae127d1fa3092b95168e4a88e2f8
 runc:
  Version:          1.0.3
  GitCommit:        v1.0.3-0-gf46b6ba
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-配置阿里云镜像加速" tabindex="-1"><a class="header-anchor" href="#_1-3-配置阿里云镜像加速" aria-hidden="true">#</a> 1.3 配置阿里云镜像加速</h3>`,9),h={href:"https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors",target:"_blank",rel:"noopener noreferrer"},k=s(`<p>在 Settings --&gt; Docker Engine 中配置镜像加速</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://7ub9273f.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+u+`" alt="image-20220602135507215" loading="lazy"></p><h3 id="_1-4-测试-hello-world" tabindex="-1"><a class="header-anchor" href="#_1-4-测试-hello-world" aria-hidden="true">#</a> 1.4 测试 hello-world</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PS C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span> <span class="token function">docker</span> run hello-world
Unable to <span class="token function">find</span> image <span class="token string">&#39;hello-world:latest&#39;</span> locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Downloaded newer image <span class="token keyword">for</span> hello-world:latest

Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 <span class="token number">1</span>. The Docker client contacted the Docker daemon.
 <span class="token number">2</span>. The Docker daemon pulled the <span class="token string">&quot;hello-world&quot;</span> image from the Docker Hub.
    <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span>
 <span class="token number">3</span>. The Docker daemon created a new container from that image <span class="token function">which</span> runs the
    executable that produces the output you are currently reading.
 <span class="token number">4</span>. The Docker daemon streamed that output to the Docker client, <span class="token function">which</span> sent it
    to your terminal.

To try something <span class="token function">more</span> ambitious, you can run an Ubuntu container with:
 $ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> ubuntu <span class="token function">bash</span>

Share images, automate workflows, and <span class="token function">more</span> with a <span class="token function">free</span> Docker ID:
 https://hub.docker.com/

For <span class="token function">more</span> examples and ideas, visit:
 https://docs.docker.com/get-started/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function g(f,_){const a=t("ExternalLinkIcon");return o(),l("div",null,[m,n("p",null,[e("官方文档："),n("a",p,[e("在 Windows | 上安装 Docker DesktopDocker 文档"),i(a)])]),b,n("p",null,[e("阿里云镜像加速器地址：参见："),n("a",h,[e("容器镜像服务 (aliyun.com)"),i(a)])]),k])}const D=r(v,[["render",g],["__file","01-install-docker-desktop.html.vue"]]);export{D as default};
