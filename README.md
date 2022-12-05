# Vuepress + Github Page 搭建个人博客

## 环境准备

### 安装 node.js

[Download | Node.js (nodejs.org)](https://nodejs.org/en/download/)

### 安装 pnpm 包管理工具

```sh
npm install -g pnpm
```

### 创建模板项目

```sh
pnpm create vuepress-theme-hope@next my-docs
```

## 运行

```sh
# 启动开发服务器
pnpm docs:dev
# 构建项目并输出
pnpm docs:build
# 清除缓存并启动开发服务器
pnpm docs:clean-dev
```