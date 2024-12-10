# 本地连通 Kubernetes 集群 - KtConnect

Github:[KtConnect](https://github.com/alibaba/kt-connect)

[参考文档](https://alibaba.github.io/kt-connect/)

KtConnect（全称Kubernetes Toolkit Connect）是一款基于Kubernetes环境用于提高本地测试联调效率的小工具。

**特性**

- `Connect`：建立数据代理通道，实现本地服务直接访问Kubernetes集群内网（包括Pod IP和Service域名）
- `Exchange`：让集群服务流量重定向到本地，实现快速验证本地版本和调试排查问题
- `Mesh`：创建路由规则重定向特定流量，实现多人协作场景下互不影响的本地调试
- `Preview`：暴露本地服务到集群，实现无需发布即可在线预览集成效果



### 安装KtConnect

[下载地址](https://alibaba.github.io/kt-connect/#/zh-cn/guide/downloads)

#### 配置环境变量

将包中的`wintun.dll`和可执行文件`ktctl.exe`一起放到`PATH`环境变量指定的任意位置。

#### 验证是否安装成功

```
C:\WINDOWS\system32>ktctl -v
ktctl version 0.3.5-beta3
```

> 注意：`ktctl`采用本地`kubectl`工具的集群配置，所以使用KtConnect前，**确保本地可以连接K8s集群**，默认使用`~/.kube/config`文件中配置的集群。可通过`KUBECONFIG`环境变量或`--kubeconfig`运行参数指定使用其他配置文件路径。

###  Connect

本地连接集群

快速建立本地到集群的 VPN 网络，同时将 Kubernetes 集群的 DNS 解析能力整合到本地，让用户可以直接通过 PodIP， ClusterIP 以及 DNS 域名访问到集群内的服务

#### 基本用法

```bash
ktctl connect
```

#### 测试

```bash
C:\WINDOWS\system32>ktctl --namespace=dev connect
8:00PM INF Using cluster context kubernetes-admin@kubernetes (kubernetes)
8:00PM INF KtConnect 0.3.5-beta3 start at 7544 (windows amd64)
8:00PM INF Fetching cluster time ...
8:00PM INF Fetching cluster time ...
8:00PM INF Using tun2socks mode
8:00PM INF Successful create config map kt-connect-shadow-gwnid
8:00PM INF Deploying shadow pod kt-connect-shadow-gwnid in namespace dev
8:00PM INF Waiting for pod kt-connect-shadow-gwnid ...
8:01PM INF Pod kt-connect-shadow-gwnid is ready
8:01PM INF Port forward local:51938 -> pod kt-connect-shadow-gwnid:22 established
8:01PM INF Socks proxy established
2022/05/24 20:01:09 Installing driver 0.14
2022/05/24 20:01:09 Extracting driver
2022/05/24 20:01:09 Installing driver
2022/05/24 20:01:09 Creating adapter
8:01PM INF Tun device KtConnectTunnel is ready
8:01PM INF Adding route to 10.96.0.0/24
8:01PM INF Adding route to 10.105.0.0/16
8:01PM INF Adding route to 10.111.0.0/16
8:01PM INF Adding route to 10.110.100.189/32
8:01PM INF Adding route to 10.98.0.0/16
8:01PM INF Adding route to 10.109.147.194/32
8:01PM INF Adding route to 10.97.81.144/32
8:01PM INF Adding route to 10.100.0.0/16
8:01PM INF Adding route to 10.104.100.124/32
8:01PM INF Adding route to 172.16.0.0/16
8:01PM INF Route to tun device completed
8:01PM INF Setting up dns in local mode
8:01PM INF Port forward local:45726 -> pod kt-connect-shadow-gwnid:53 established
8:01PM INF Setup local DNS with upstream [tcp:127.0.0.1:45726 udp:192.168.0.27:53]
8:01PM INF Creating udp dns on port 53
8:01PM INF ---------------------------------------------------------------
8:01PM INF  All looks good, now you can access to resources in the kubernetes cluster
8:01PM INF ---------------------------------------------------------------
```

### Exchange

集群流量转发到本地

Exhange 命令通过在集群内部署代理容器，替换集群内的原有应用，并将所有对代理容器的请求直接转发到本地端口。

#### 基本用法

```shell
ktctl exchange <目标服务名> --expose <本地端口>:<目标服务端口>
```

#### 测试

```shell
C:\WINDOWS\system32>ktctl exchange shop-app --expose 8010:8080
4:35PM INF Using cluster context kubernetes-admin@kubernetes (kubernetes)
4:35PM INF KtConnect 0.3.5-beta3 start at 10940 (windows amd64)
4:35PM INF Fetching cluster time ...
4:35PM INF Using selector mode
4:35PM ERR Exit: service 'shop-app' is not found in namespace default
4:35PM INF Removed pid file C:\Users\DELL/.kt/pid/exchange-10940.pid
```

> `--expose`是一个必须的参数，它的值应当与被替换Service的`port`属性值相同，若本地运行服务的端口与目标Service的`port`属性值不一致，则应当使用`<本地端口>:<目标Service端口>`的方式来指定。

### Mesh

Mesh 与 Exchange 的能力其实非常类似，在调用之后都会在集群内启动一个代理容器，并且继承原应用的标签。 但是最大的差异在于 Exhange 会将原应用的 Replicas 直接降到 0，完全接管集群内所有对原应用的流量。 而 Mesh 则是在保持原有应用 Pod 不变的前提下，创建一个新的代理容器并且继承原应用的所有标签，但是会新增加一个随机的 version 标签。

### 基本用法

```bash
ktctl mesh <目标服务名> --expose <本地端口>:<目标服务端口>
```



### Recover

恢复指定服务被`exchange`或`mesh`命令重定向的流量

#### 基本用法

```shell
ktctl recover <目标服务名>
```