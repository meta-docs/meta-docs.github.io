# Git 常用命令

## 配置ssh key
一 、设置Git的user name和email

```
$ git config --global user.name "xxxxx"
$ git config --global user.email "xxxxx@gmail.com"
```

二、生成SSH密钥过程

1. 查看是否已经有了ssh密钥：cd ~/.ssh，如果没有密钥则不会有此文件夹，有则备份删除
2. 生成密钥

```
$ ssh-keygen -t rsa -C "xxxxx@gmail.com"
```

按3个回车，密码为空。


```
Your identification has been saved in /home/tekkub/.ssh/id_rsa.
Your public key has been saved in /home/tekkub/.ssh/id_rsa.pub.
The key fingerprint is:
………………
```

最后得到了两个文件：`id_rsa`和`id_rsa.pub`

三、添加密钥到ssh：ssh-add 文件名，**需要之前输入密码。**

四、在github上添加ssh密钥，这要添加的是`id_rsa.pub`里面的公钥。打开https://github.com/ ，登陆，然后添加ssh。

五、测试 `ssh git@github.com`


## 本地代码库推送到远程

**Existing folder**
```
cd existing_folder
git init
git remote add origin git@121.196.206.176:arch/gongkongmall-utils.git
git add .
git commit
git push -u origin master
```


**Existing Git repository**


```
cd existing_repo
git remote add origin git@121.196.206.176:arch/gongkongmall-utils.git
git push -u origin --all
git push -u origin --tags
```

## 批量删除tag（先删远程，后删本地）

远程

```
git show-ref --tag | grep "v1.0.5.emg"| awk '{print $2}'|xargs git push origin --delete
```


本地
```
git tag | grep "v1.0.5.emg" |xargs git tag -d
```



## 忽略已纳入版本管理的文件或文件夹

```
// 告诉git忽略对已经纳入版本管理的文件bootstrap.properties的修改,git会一直忽略此文件直到重新告诉git可以再次跟踪此文件
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
git ls-files -v | grep -e "^[hsmrck]"
```



## 查看远程分支

加上-a参数可以查看远程分支，远程分支会用红色表示出来（如果你开了颜色支持的话）：

``` bash
$ git branch -a
  master
  remote
  tungway
  v1.52
* zrong
  remotes/origin/master
  remotes/origin/tungway
  remotes/origin/v1.52
  remotes/origin/zrong
```

## 删除远程分支和tag

``` bash
删除远程分支
$ git push origin --delete <branchName>
删除tag
git push origin --delete tag <tagname>
```


## 删除不存在对应远程分支的本地分支

假设这样一种情况：

1. 我创建了本地分支b1并pull到远程分支 `origin/b1`；
2. 其他人在本地使用fetch或pull创建了本地的b1分支；
3. 我删除了 `origin/b1` 远程分支；
4. 其他人再次执行fetch或者pull并不会删除这个他们本地的 `b1` 分支，运行 `git branch -a` 也不能看出这个branch被删除了，如何处理？

使用下面的代码查看b1的状态：

``` bash
$ git remote show origin
* remote origin
  Fetch URL: git@github.com:xxx/xxx.git
  Push  URL: git@github.com:xxx/xxx.git
  HEAD branch: master
  Remote branches:
    master                 tracked
    refs/remotes/origin/b1 stale (use 'git remote prune' to remove)
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

这时候能够看到b1是stale的，使用 `git remote prune origin` 可以将其从本地版本库中去除。

更简单的方法是使用这个命令，它在fetch之后删除掉没有与远程分支对应的本地分支：

``` bash
git fetch -p
```

## 重命名远程分支

在git中重命名远程分支，其实就是先删除远程分支，然后重命名本地分支，再重新提交一个远程分支。

例如下面的例子中，我需要把 devel 分支重命名为 develop 分支：

``` bash
$ git branch -av
* devel                             752bb84 Merge pull request #158 from Gwill/devel
  master                            53b27b8 Merge pull request #138 from tdlrobin/master
  zrong                             2ae98d8 modify CCFileUtils, export getFileData
  remotes/origin/HEAD               -> origin/master
  remotes/origin/add_build_script   d4a8c4f Merge branch 'master' into add_build_script
  remotes/origin/devel              752bb84 Merge pull request #158 from Gwill/devel
  remotes/origin/devel_qt51         62208f1 update .gitignore
  remotes/origin/master             53b27b8 Merge pull request #138 from tdlrobin/master
  remotes/origin/zrong              2ae98d8 modify CCFileUtils, export getFileData
```

删除远程分支：

``` bash
$ git push --delete origin devel
To git@github.com:zrong/quick-cocos2d-x.git
 - [deleted]         devel
```

重命名本地分支： 

``` bash
git branch -m devel develop
```

推送本地分支：

``` bash
$ git push origin develop
Counting objects: 92, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (48/48), done.
Writing objects: 100% (58/58), 1.38 MiB, done.
Total 58 (delta 34), reused 12 (delta 5)
To git@github.com:zrong/quick-cocos2d-x.git
 * [new branch]      develop -> develop
```

然而，在 github 上操作的时候，我在删除远程分支时碰到这个错误：

``` bash
$ git push --delete origin devel
remote: error: refusing to delete the current branch: refs/heads/devel
To git@github.com:zrong/quick-cocos2d-x.git
 ! [remote rejected] devel (deletion of the current branch prohibited)
error: failed to push some refs to 'git@github.com:zrong/quick-cocos2d-x.git'
```

这是由于在 github 中，devel 是项目的默认分支。要解决此问题，这样操作：

1. 进入 github 中该项目的 Settings 页面；
2. 设置 Default Branch 为其他的分支（例如 master）；
3. 重新执行删除远程分支命令。

## 把本地tag推送到远程

``` bash
git push --tags
```

## 获取远程tag

``` bash
git fetch origin tag <tagname>
```


# git FAQ
## error: Unknown SSL protocol error in connection to
```
git clone https://code.google.com/p/android-os-monitor.osmonitor/ 
Cloning into android-os-monitor.osmonitor...
error: Unknown SSL protocol error in connection to code.google.com:443 while accessinghttps://code.google.com/p/android-os-monitor.osmonitor/info/refs
```
因为国内特殊的网络环境，所以用github for windows，在使用git shell的clone命令是会出现这样的情况，那么解决这个问题的办法就是用代理方式去访问了，这里的解决方法中用的是goagent，是在使用goagent的前提下才能执行下面的操作。打开goagent软件，会看到 listen Address:127.0.0.1:8087，那么在git shell中执行的命令就是：`git config --global http.proxy "127.0.0.1:8087"`
## fatal: unable to access 
```
git clone https://github.com/subying/jsbook.git 
Cloning into 'jsbook'...
fatal: unable to access '~.git/': SSL certificate problem: unable to get local issuer certificate
```
提示SSL证书错误。后面用谷歌搜索了一下，发现说这个错误并不重要是系统证书的问题，系统判断到这个行为会造成不良影响，所以进行了阻止，只要设置跳过SSL证书验证就可以了，那么用命令 ：`git config --global http.sslVerify false`

## fatal: The remote end hung up unexpectedly
Git 在push的时候出现了:`fatal: The remote end hung up unexpectedly`,问题原因是http.postBuffer默认上限为1M所致。在git的配置里将http.postBuffer变量改大一些即可，比如将上限设为500M。
解决方法：`git config http.postBuffer 524288000`