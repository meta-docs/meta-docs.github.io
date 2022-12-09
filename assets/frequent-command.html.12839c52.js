import{_ as i,V as t,W as r,X as n,Y as e,Z as d,a1 as a,y as l}from"./framework.46148295.js";const o={},c=a(`<h1 id="git-常用命令" tabindex="-1"><a class="header-anchor" href="#git-常用命令" aria-hidden="true">#</a> Git 常用命令</h1><h2 id="配置ssh-key" tabindex="-1"><a class="header-anchor" href="#配置ssh-key" aria-hidden="true">#</a> 配置ssh key</h2><p>一 、设置Git的user name和email</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ git config --global user.name &quot;xxxxx&quot;
$ git config --global user.email &quot;xxxxx@gmail.com&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>二、生成SSH密钥过程</p><ol><li>查看是否已经有了ssh密钥：cd ~/.ssh，如果没有密钥则不会有此文件夹，有则备份删除</li><li>生成密钥</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ssh-keygen -t rsa -C &quot;xxxxx@gmail.com&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按3个回车，密码为空。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Your identification has been saved in /home/tekkub/.ssh/id_rsa.
Your public key has been saved in /home/tekkub/.ssh/id_rsa.pub.
The key fingerprint is:
………………
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后得到了两个文件：<code>id_rsa</code>和<code>id_rsa.pub</code></p><p>三、添加密钥到ssh：ssh-add 文件名，<strong>需要之前输入密码。</strong></p>`,11),u=n("code",null,"id_rsa.pub",-1),p={href:"https://github.com/",target:"_blank",rel:"noopener noreferrer"},g=a(`<p>五、测试 <code>ssh git@github.com</code></p><h2 id="本地代码库推送到远程" tabindex="-1"><a class="header-anchor" href="#本地代码库推送到远程" aria-hidden="true">#</a> 本地代码库推送到远程</h2><p><strong>Existing folder</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd existing_folder
git init
git remote add origin git@121.196.206.176:arch/gongkongmall-utils.git
git add .
git commit
git push -u origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Existing Git repository</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd existing_repo
git remote add origin git@121.196.206.176:arch/gongkongmall-utils.git
git push -u origin --all
git push -u origin --tags
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批量删除tag-先删远程-后删本地" tabindex="-1"><a class="header-anchor" href="#批量删除tag-先删远程-后删本地" aria-hidden="true">#</a> 批量删除tag（先删远程，后删本地）</h2><p>远程</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git show-ref --tag | grep &quot;v1.0.5.emg&quot;| awk &#39;{print $2}&#39;|xargs git push origin --delete
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>本地</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git tag | grep &quot;v1.0.5.emg&quot; |xargs git tag -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="忽略已纳入版本管理的文件或文件夹" tabindex="-1"><a class="header-anchor" href="#忽略已纳入版本管理的文件或文件夹" aria-hidden="true">#</a> 忽略已纳入版本管理的文件或文件夹</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 告诉git忽略对已经纳入版本管理的文件bootstrap.properties的修改,git会一直忽略此文件直到重新告诉git可以再次跟踪此文件
git update-index --assume-unchanged application.properties
git update-index --assume-unchanged bootstrap.properties

git update-index --assume-unchanged src/main/resources/application.properties
git update-index --assume-unchanged src/main/resources/bootstrap.properties

// 告诉git恢复跟踪.classpath
git update-index --no-assume-unchanged application.properties
git update-index --no-assume-unchanged bootstrap.properties

git update-index --no-assume-unchanged src/main/resources/application.properties
git update-index --no-assume-unchanged src/main/resources/bootstrap.properties

// 查看当前被忽略的、已经纳入版本库管理的文件：
git ls-files -v | grep -e &quot;^[hsmrck]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看远程分支" tabindex="-1"><a class="header-anchor" href="#查看远程分支" aria-hidden="true">#</a> 查看远程分支</h2><p>加上-a参数可以查看远程分支，远程分支会用红色表示出来（如果你开了颜色支持的话）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token parameter variable">-a</span>
  master
  remote
  tungway
  v1.52
* zrong
  remotes/origin/master
  remotes/origin/tungway
  remotes/origin/v1.52
  remotes/origin/zrong
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除远程分支和tag" tabindex="-1"><a class="header-anchor" href="#删除远程分支和tag" aria-hidden="true">#</a> 删除远程分支和tag</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>删除远程分支
$ <span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> <span class="token operator">&lt;</span>branchName<span class="token operator">&gt;</span>
删除tag
<span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> tag <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除不存在对应远程分支的本地分支" tabindex="-1"><a class="header-anchor" href="#删除不存在对应远程分支的本地分支" aria-hidden="true">#</a> 删除不存在对应远程分支的本地分支</h2><p>假设这样一种情况：</p><ol><li>我创建了本地分支b1并pull到远程分支 <code>origin/b1</code>；</li><li>其他人在本地使用fetch或pull创建了本地的b1分支；</li><li>我删除了 <code>origin/b1</code> 远程分支；</li><li>其他人再次执行fetch或者pull并不会删除这个他们本地的 <code>b1</code> 分支，运行 <code>git branch -a</code> 也不能看出这个branch被删除了，如何处理？</li></ol><p>使用下面的代码查看b1的状态：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote show origin
* remote origin
  Fetch URL: git@github.com:xxx/xxx.git
  Push  URL: git@github.com:xxx/xxx.git
  HEAD branch: master
  Remote branches:
    master                 tracked
    refs/remotes/origin/b1 stale <span class="token punctuation">(</span>use <span class="token string">&#39;git remote prune&#39;</span> to remove<span class="token punctuation">)</span>
  Local branch configured <span class="token keyword">for</span> <span class="token string">&#39;git pull&#39;</span><span class="token builtin class-name">:</span>
    master merges with remote master
  Local ref configured <span class="token keyword">for</span> <span class="token string">&#39;git push&#39;</span><span class="token builtin class-name">:</span>
    master pushes to master <span class="token punctuation">(</span>up to <span class="token function">date</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候能够看到b1是stale的，使用 <code>git remote prune origin</code> 可以将其从本地版本库中去除。</p><p>更简单的方法是使用这个命令，它在fetch之后删除掉没有与远程分支对应的本地分支：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> fetch <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="重命名远程分支" tabindex="-1"><a class="header-anchor" href="#重命名远程分支" aria-hidden="true">#</a> 重命名远程分支</h2><p>在git中重命名远程分支，其实就是先删除远程分支，然后重命名本地分支，再重新提交一个远程分支。</p><p>例如下面的例子中，我需要把 devel 分支重命名为 develop 分支：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token parameter variable">-av</span>
* devel                             752bb84 Merge pull request <span class="token comment">#158 from Gwill/devel</span>
  master                            53b27b8 Merge pull request <span class="token comment">#138 from tdlrobin/master</span>
  zrong                             2ae98d8 modify CCFileUtils, <span class="token builtin class-name">export</span> getFileData
  remotes/origin/HEAD               -<span class="token operator">&gt;</span> origin/master
  remotes/origin/add_build_script   d4a8c4f Merge branch <span class="token string">&#39;master&#39;</span> into add_build_script
  remotes/origin/devel              752bb84 Merge pull request <span class="token comment">#158 from Gwill/devel</span>
  remotes/origin/devel_qt51         62208f1 update .gitignore
  remotes/origin/master             53b27b8 Merge pull request <span class="token comment">#138 from tdlrobin/master</span>
  remotes/origin/zrong              2ae98d8 modify CCFileUtils, <span class="token builtin class-name">export</span> getFileData
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除远程分支：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push <span class="token parameter variable">--delete</span> origin devel
To git@github.com:zrong/quick-cocos2d-x.git
 - <span class="token punctuation">[</span>deleted<span class="token punctuation">]</span>         devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重命名本地分支：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch <span class="token parameter variable">-m</span> devel develop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>推送本地分支：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push origin develop
Counting objects: <span class="token number">92</span>, done.
Delta compression using up to <span class="token number">4</span> threads.
Compressing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">48</span>/48<span class="token punctuation">)</span>, done.
Writing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">58</span>/58<span class="token punctuation">)</span>, <span class="token number">1.38</span> MiB, done.
Total <span class="token number">58</span> <span class="token punctuation">(</span>delta <span class="token number">34</span><span class="token punctuation">)</span>, reused <span class="token number">12</span> <span class="token punctuation">(</span>delta <span class="token number">5</span><span class="token punctuation">)</span>
To git@github.com:zrong/quick-cocos2d-x.git
 * <span class="token punctuation">[</span>new branch<span class="token punctuation">]</span>      develop -<span class="token operator">&gt;</span> develop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在 github 上操作的时候，我在删除远程分支时碰到这个错误：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push <span class="token parameter variable">--delete</span> origin devel
remote: error: refusing to delete the current branch: refs/heads/devel
To git@github.com:zrong/quick-cocos2d-x.git
 <span class="token operator">!</span> <span class="token punctuation">[</span>remote rejected<span class="token punctuation">]</span> devel <span class="token punctuation">(</span>deletion of the current branch prohibited<span class="token punctuation">)</span>
error: failed to push some refs to <span class="token string">&#39;git@github.com:zrong/quick-cocos2d-x.git&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是由于在 github 中，devel 是项目的默认分支。要解决此问题，这样操作：</p><ol><li>进入 github 中该项目的 Settings 页面；</li><li>设置 Default Branch 为其他的分支（例如 master）；</li><li>重新执行删除远程分支命令。</li></ol><h2 id="把本地tag推送到远程" tabindex="-1"><a class="header-anchor" href="#把本地tag推送到远程" aria-hidden="true">#</a> 把本地tag推送到远程</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="获取远程tag" tabindex="-1"><a class="header-anchor" href="#获取远程tag" aria-hidden="true">#</a> 获取远程tag</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> fetch origin tag <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="git-faq" tabindex="-1"><a class="header-anchor" href="#git-faq" aria-hidden="true">#</a> git FAQ</h1><h2 id="error-unknown-ssl-protocol-error-in-connection-to" tabindex="-1"><a class="header-anchor" href="#error-unknown-ssl-protocol-error-in-connection-to" aria-hidden="true">#</a> error: Unknown SSL protocol error in connection to</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git clone https://code.google.com/p/android-os-monitor.osmonitor/ 
Cloning into android-os-monitor.osmonitor...
error: Unknown SSL protocol error in connection to code.google.com:443 while accessinghttps://code.google.com/p/android-os-monitor.osmonitor/info/refs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为国内特殊的网络环境，所以用github for windows，在使用git shell的clone命令是会出现这样的情况，那么解决这个问题的办法就是用代理方式去访问了，这里的解决方法中用的是goagent，是在使用goagent的前提下才能执行下面的操作。打开goagent软件，会看到 listen Address:127.0.0.1:8087，那么在git shell中执行的命令就是：<code>git config --global http.proxy &quot;127.0.0.1:8087&quot;</code></p><h2 id="fatal-unable-to-access" tabindex="-1"><a class="header-anchor" href="#fatal-unable-to-access" aria-hidden="true">#</a> fatal: unable to access</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git clone https://github.com/subying/jsbook.git 
Cloning into &#39;jsbook&#39;...
fatal: unable to access &#39;~.git/&#39;: SSL certificate problem: unable to get local issuer certificate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示SSL证书错误。后面用谷歌搜索了一下，发现说这个错误并不重要是系统证书的问题，系统判断到这个行为会造成不良影响，所以进行了阻止，只要设置跳过SSL证书验证就可以了，那么用命令 ：<code>git config --global http.sslVerify false</code></p><h2 id="fatal-the-remote-end-hung-up-unexpectedly" tabindex="-1"><a class="header-anchor" href="#fatal-the-remote-end-hung-up-unexpectedly" aria-hidden="true">#</a> fatal: The remote end hung up unexpectedly</h2><p>Git 在push的时候出现了:<code>fatal: The remote end hung up unexpectedly</code>,问题原因是http.postBuffer默认上限为1M所致。在git的配置里将http.postBuffer变量改大一些即可，比如将上限设为500M。 解决方法：<code>git config http.postBuffer 524288000</code></p>`,53);function v(m,b){const s=l("ExternalLinkIcon");return t(),r("div",null,[c,n("p",null,[e("四、在github上添加ssh密钥，这要添加的是"),u,e("里面的公钥。打开"),n("a",p,[e("https://github.com/"),d(s)]),e(" ，登陆，然后添加ssh。")]),g])}const x=i(o,[["render",v],["__file","frequent-command.html.vue"]]);export{x as default};
