# Docker Desktop for Windows 开启 Kubernetes

在Setttings中勾选启用kubernetes。

因为Docker Desktop在初始化kubernetes时所用到的镜像image都是国外源，可能无法下载成功，可以从 https://github.com/AliyunContainerService/k8s-for-docker-desktop 下载。

![image-20220602134250487](./assets/image-20220602134250487.png)

### 安装 kubectl 命令行工具

#### 安装 kubectl 

```shell
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.24.0/bin/windows/amd64/kubectl.exe
```

#### 配置集群信息

默认配置文件路径 ~/.kube/config

#### 验证是否安装成功

```shell
C:\WINDOWS\system32>kubectl version
WARNING: This version information is deprecated and will be replaced with the output from kubectl version --short.  Use --output=yaml|json to get the full version.
Client Version: version.Info{Major:"1", Minor:"24", GitVersion:"v1.24.0", GitCommit:"4ce5a8954017644c5420bae81d72b09b735c21f0", GitTreeState:"clean", BuildDate:"2022-05-03T13:46:05Z", GoVersion:"go1.18.1", Compiler:"gc", Platform:"windows/amd64"}
Kustomize Version: v4.5.4
Server Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.6", GitCommit:"ad3338546da947756e8a88aa6822e9c11e7eac22", GitTreeState:"clean", BuildDate:"2022-04-14T08:43:11Z", GoVersion:"go1.17.9", Compiler:"gc", Platform:"linux/amd64"}
C:\WINDOWS\system32>kubectl cluster-info
Kubernetes control plane is running at https://dev.k8s-master.server:6443
CoreDNS is running at https://dev.k8s-master.server:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

### 配置 Kubernetes 控制台

#### 部署 Kubernetes dashboard

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.0/aio/deploy/recommended.yaml
```

或

```
kubectl apply -f kubernetes-dashboard.yaml
```

检查 kubernetes-dashboard 应用状态

```
kubectl get pod -n kubernetes-dashboard
```

开启 API Server 访问代理

```
kubectl proxy
```

通过如下 URL 访问 Kubernetes dashboard

http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

#### 配置控制台访问令牌

授权`kube-system`默认服务账号

```shell
kubectl apply -f kube-system-default.yaml
```

```shell
PS C:\Users\Administrator> kubectl apply -f kube-system-default.yaml
clusterrolebinding.rbac.authorization.k8s.io/kube-system-default created
secret/default created
```

生成token

```shell
$TOKEN=((kubectl -n kube-system describe secret default | Select-String "token:") -split " +")[1]
kubectl config set-credentials docker-desktop --token="${TOKEN}"
echo $TOKEN
```

```shell
PS C:\Users\Administrator> kubectl config set-credentials docker-desktop --token="${TOKEN}"
User "docker-desktop" set.
PS C:\Users\Administrator> echo $TOKEN
eyJhbGciOiJSUzI1NiIsImtpZCI6IkVYeDI1NU9scHotWkJ5cVlGY0JPZEVvbnJLQjFfNVBHN3Y3RWdsVnQ0ZlUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImRlZmF1bHQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI3MWI5ZGZkNi0zMGZkLTQ1NjctYjUyMi05MTQxNGVmOTMzOWUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06ZGVmYXVsdCJ9.kYLptRHK3ALb7ZaanSvXrVh4jTNok_QknBoZPc2Zlbpzli3XkMxuD3GMn2O4jfTkDi7Fm5F9aCtnxBz-yYt8WQzLEm9CqPoA4m3nsOYgMRKnGjRx4Dv1oK0E_mIHPlTjV_JvgFmE_405AKXtBkGCBj8U63IHe9pmblooRssUD9v1q12UiRxWxBj0M2ePnqY3NT8ANQ7xMmY4NkjMGz5h7iNNjlepD3yEusGspBCm08XFqXKLZyAxXW5QDcBN8bUJ1pQJP5AOW_Y6wQiTnEePy_VmOB7W0hn6982YRit1Fu4BQlMgp3BvXHAG7AMI7kv-jeEx2PtkCZVbKXqcTPn1aQ
```

