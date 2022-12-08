
# Git 配置多用户

## 1 清除全局配置

在正式配置之前，先查看是否存在全局配置，执行命令：

```sh
git config --global --list
```

如果发现其中有 user.name 和 user.email 信息，执行以下命令将其清除

```sh
git config --global --unset user.name
git config --global --unset user.email
```

## 2 生成密钥对

钥对的保存位置默认在 `~/.ssh` 目录下，我们先删除这个目录中已存在的 id_rsa、id_rsa.pub 之类的公钥和密钥文件。

开始生成 github 上的仓库钥对，通过 -C 参数填写 github 的邮箱：

```sh
cd ~/.ssh
ssh-keygen -t rsa -C "xxxx@xxx.com"
```

此时会提示

```
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/fangtao/.ssh/id_rsa):
```

在这里输入公钥的名字，默认是 id_rsa，为了和后面的 gitlab配置区分，这里输入 id_rsa_github，输入完毕后，一路回车，钥对就生成完毕了。

下面开始生成 gitlab 上的仓库钥对，步骤和上面一样。

## 3 添加 SSH Keys

将 id_rsa_github.pub 和 id_rsa_gitlab.pub 内容分别添加到 github 和 gitlab 的 SSH Keys 中，这里就不啰嗦了。

## 4 添加私钥 

在上一步中，我们已经将公钥添加到了 github 或者 gitlab 服务器上，我们还需要将私钥添加到本地中，不然无法使用。

```sh
# 将 GitHub 私钥添加到本地
ssh-add ~/.ssh/id_rsa_github
# 将 GitLab 私钥添加到本地
ssh-add ~/.ssh/id_rsa_gitlab
```

此时如果提示 

```
Could not open a connection to your authentication agent.
```

执行以下命令后，重新添加私钥

```sh
ssh-agent bash
```

## 5 管理密钥

通过以上步骤，公钥、密钥分别被添加到 git 服务器和本地了。下面我们需要在本地创建一个密钥配置文件，通过该文件，实现根据仓库的 remote 链接地址自动选择合适的私钥。

编辑 ~/.ssh 目录下的 config 文件，如果没有，请创建。

```sh
vim ~/.ssh/config
```

配置内容如下：

```
Host github.com
HostName github.com
User github_user_name
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github

Host gitlab.xxx.com
HostName gitlab.xxx.com
User gitlab_user_name
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitlab
```

该文件分为多个用户配置，每个用户配置包含以下几个配置项：

- Host：仓库网站的别名。推荐和HostName一致，否则在 git clone 时可能需要将 remote 地址中 HostName 替换为别名
- HostName：仓库网站的域名（PS：IP 地址应该也可以）
- User：仓库网站上的用户名，如果使用用户名不成功可以用邮箱
- IdentityFile：私钥的绝对路径

注： Host 就是可以替代 HostName 来使用的别名，比如我 github 上某个仓库的 clone 地址为：git@github.com:github_user_name/express.git

那么使用 Host 后就是：git@github:github_user_name/express.git

咳咳，反正我觉得没啥用，毕竟 remote 地址都是直接复制下来的，没人会手敲吧？

可以用 ssh -T 命令检测下配置的 Host 是否是连通的：

```sh
ssh -T git@github.com
ssh -T git@gitlab.xxx.com
Welcome to GitLab, @lemon!
```

## 6 仓库配置

### 6.1 按项目配置

完成以上配置后，已经基本完成了所有配置。分别进入附属于 github 和 gitlab 的仓库，此时都可以进行 git 操作了。但是别急，如果你此时提交仓库修改后，你会发现提交的用户名变成了你的系统主机名。

这是因为 git 的配置分为三级别，System 、 Global 、 Local。System 即系统级别，Global 为配置的全局，Local 为仓库级别，优先级是 Local > Global > System。

因为我们并没有给仓库配置用户名，又在一开始清除了全局的用户名，因此此时你提交的话，就会使用 System 级别的用户名，也就是你的系统主机名了。

因此我们需要为每个仓库单独配置用户名信息，假设我们要配置 github 的某个仓库，进入该仓库后，执行：

```
git config --local user.name "github_user_name"
git config --local user.email "github_user_name@foxmail.com"
```

执行完毕后，通过以下命令查看本仓库的所有配置信息：

```
git config --local --list
```

至此你已经配置好了 Local 级别的配置了，此时提交该仓库的代码，提交用户名就是你设置的 Local 级别的用户名了。

### 6.2  按文件夹配置

用项目配置的方法虽然可以实现不同项目配置不同信息，但每个项目都配置一遍就太麻烦了，而且会经常出现漏配的情况，有把公司信息暴露到公共空间中风险。使用git的`Conditional Includes`可以解决这个问题。`Conditional Includes`可以针对文件夹来配置，配置方法如下：

在`~/`目录下，新建 `.gitconfig_gitlab` 文件，编辑内容如下

```
[user]
    name = gitlab_name
    email = gitlab_mail@xxx.com
```

继续新建 `.gitconfig_github` 文件，编辑内容如下

```text
[user]
    name = github_name
    email = github_mail@xxx.com
```

全局通用配置文件`~/.gitconfig`里面的内容是：

```ini
[includeIf "gitdir:~/gitlab-workspace/"]
    path = .gitconfig-self
[includeIf "gitdir:~/github_workspace/"]
    path = .gitconfig-work
```

`gitdir:`后面设置的是你想设置的文件夹目录，使用的是glob匹配模式，记得要以`/`结尾，否则不会生效（以`/`结尾，`**`会被自动添加上，比如`you/dir/` 会变成 `you/dir/**`，这样才能生效到所有子文件夹）。

项目配置 > 文件夹配置 > 全局配置