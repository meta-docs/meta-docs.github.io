# PNPM 设置PNPM全局安装路径

在使用 `PNPM` 默认的全局配置时，它会在系统盘存储你全局安装的NPM包，使用久了，安装全局的包多了，自然就会占用很多系统盘的存储空间，对于给系统盘分配较小的存储空间的小伙伴是不太友好的，而且重装系统时也同样会被格式化。 在安装PNPM时给它改变全局安装的位置，让系统盘的做它应该做的事

1. 配置PNPM环境变量
2. 配置PNPM仓库路径
3. 配置PNPM全局安装路径
4. 配置PNPM缓存路径
5. 配置PNPM状态路径

## 配置PNPM环境变量

> 给PNPM找到你配置的全局安装路径

1. WIN+S快捷键 -> 编辑系统环境变量 -> 环境变量 -> 新建系统变量
2. 设置PNPM环境变量映射:
   1. PNPM仓库名: `PNPM_HOME`
   2. PNPM路径(你要存放的仓库目录): `D:/AppData/.pnpm-store\bin`

## 配置PNPM全局存储路径

1. 打开任意终端
2. 将`<global-store-path>`替换成你要存放的仓库目录,例如`E:\.pnpm-store\global`

语法:

```shell
pnpm config set store-dir <global-store-path>
```

示例:

```shell
pnpm config set store-dir E:\.pnpm-store\global
```

## 配置PNPM全局bin存储路径

1. 打开任意终端
2. 将`<store-bin-path>`替换成你的PNPM的bin目录, 例如`E:\.pnpm-store\bin`

```shell
pnpm config set global-bin-dir <store-bin-path>
```

示例:

```shell
pnpm config set global-bin-dir E:\.pnpm-store\bin
```

## 配置PNPM缓存存储路径

> PNPM的缓存存储位置

1. 打开任意终端
2. 将`<store-cache-path>`替换成你要存放的缓存目录,例如:`E:\.pnpm-store\cache`

```shell
pnpm config set cache-dir <store-cache-path>
```

示例:

```shell
pnpm config set cache-dir E:\.pnpm-store\cache
```

## 配置PNPM状态存储路径

> 选择存储PNPM状态的位置(管理安装/网络 失败/异常等)

1. 打开任意终端
2. 将`<store-state-path>`替换成你要存放的仓库目录,例如`E:\.pnpm-store\state`

```shell
pnpm config set state-dir <store-state-path>
```

示例:

```shell
pnpm config set state-di E:\.pnpm-store\state
```

## 验证

```shell
pnpm config get store-dir
pnpm config get global-bin-dir
pnpm config get cache-dir
pnpm config get state-di
```

## 应用配置(可选)

> 如果你使用以上方式配置成功了,那么此步骤可以跳过

1. 打开任意终端
2. 输入指令

```sh
 pnpm setup 
```

