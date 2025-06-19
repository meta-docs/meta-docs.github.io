# Git 常用命令

## 配置 ssh key

### 1 设置全局的 user name 和 email

    git config --global user.name "xxxxx"
    git config --global user.email "xxxxx@gmail.com"

### 2 生成SSH密钥

2.1 查看是否已经有了ssh密钥

`cd ~/.ssh`，如果没有密钥则不会有此文件夹，有则备份删除

2.2 生成密钥

    ssh-keygen -t rsa -C "xxxxx@gmail.com"

2.3 按3个回车，密码为空。

    Your identification has been saved in /home/tekkub/.ssh/id_rsa.
    Your public key has been saved in /home/tekkub/.ssh/id_rsa.pub.
    The key fingerprint is:
    ………………

最后得到了两个文件：`id_rsa`和`id_rsa.pub`

### 3 添加密钥到 github/gitee/gitlab

这里要添加的是`id_rsa.pub`里面的公钥。打开 <https://github.com> ，登陆并添加ssh。

### 4 测试

    ssh git@github.com

## 本地代码库推送到远程

**Existing folder**

```shell
cd existing_folder
git init
# git config --local user.name "Eric"
# git config --local user.email "eric@skycoresaas.com"
git remote add origin git@121.196.206.176:arch/gongkongmall-utils.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

**Existing Git repository**

```shell
cd existing_repo
git remote add origin git@121.196.206.176:arch/gongkongmall-utils.git
git push -u origin --all
git push -u origin --tags
```

## 批量删除 tag（先删远程，后删本地）

删除远程 tag

    git show-ref --tag | grep "v1.0.5.emg"| awk '{print $2}'|xargs git push origin --delete

删除本地 tag

    git tag | grep "v1.0.5.emg" |xargs git tag -d

## git 禁止自动转 CRLF

```bash
# 全局
git config --global core.autocrlf false
git config --global core.safecrlf false
# 单个仓库
git config core.autocrlf false
git config core.safecrlf false
```

## 提交规范

* feat（新功能）
* fix（修复bug）
* docs（文档更新）
* style（代码格式调整，不影响逻辑）
* refactor（重构代码）
* perf（性能优化）
* test（添加或修改测试）
* chore（构建过程或辅助工具的变动）
