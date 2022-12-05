# Vuepress + Github Page 搭建个人博客

## 环境准备

### 安装 node.js

[Download | Node.js (nodejs.org)](https://nodejs.org/en/download/)

### 安装 pnpm 包管理工具

```sh
npm install -g pnpm
```

### 创建新项目

使用 `vuepress-theme-hope` 创建一个初始的项目模板

```sh
pnpm create vuepress-theme-hope@next my-docs
```

## 运行已存在项目

```sh
# 安装依赖，已经安装了vuepress的不需要运行
pnpm i
# 启动开发服务器
pnpm docs:dev
# 构建项目并输出
pnpm docs:build
# 清除缓存并启动开发服务器
pnpm docs:clean-dev
```


## 部署

### 创建 GitHub 仓库

 前往 GitHub 并创建一个名为 username.github.io 的新公共存储库，其中 username 是 GitHub 上的用户名（或组织名称）。

注意将 GitHub Pages 的构建分支改为工作流中定义的分支