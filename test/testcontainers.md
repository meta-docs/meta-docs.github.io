# Testcontainers

## 连接远程Docker
### 背景
本地开发使用windows系统，使用Testcontainers 进行集成测试时需要连接Docker，而Docker for windows版本要求开启Hyper-v，Hyper-v与vmware是冲突的，不升级硬件的情况下只能使用其中一个。于是想到在本地连接虚拟机上的Docker进行测试
​

### Docker Server远程链接配置	
​


1. 在/etc/docker/daemon.json中开启远程链接端口
```json
{"hosts": ["tcp://0.0.0.0:2375", "unix:///var/run/docker.sock"]}
```

2. 添加文件/etc/systemd/system/docker.service.d/override.conf​
```
 [Service]
 ExecStart=
 ExecStart=/usr/bin/dockerd
```
_注意上述路径不存在则手动创建_
_​_


3. 重启dock容器
```
$ sudo systemctl daemon-reload # 重载守护进程
$ sudo systemctl restart docker # 重启docker容器
```

4. 在客户端测试连接
```
$ docker -H 192.168.57.110:2375 info
```
成功输出信息，证明客户端可以成功连接到远程的服务端。
### 设置 DOCKER_HOST


####  方式一：修改环境变量
```
DOCKER_HOST=tcp://remote_docker_server_ip:2375
```
#### 方式二：直接在java测试代码中，构造容器前，通过代码
```java
System.setProperty("DOCKER_HOST","tcp://remote_docker_server_ip:2375")
```
#### 方式三：如果集成测试使用maven failsafe插件，则在插件上配置环境变量
