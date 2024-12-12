# Java 成长之路

## 编辑器

[Visual Studio Code 快捷键](./software/vscode 快捷键.md)

## Java

[Java 基础](./java/Java基础.md)

## 架构演进

- 单体架构
- 面向服务架构 SOA
- 水平分层架构
- 微服务架构 Mircoservice
- 服务网格架构 Service Mesh

### 微服务架构

哪些场景不适合微服务

1. 业务需求变化慢
2. 高性能
3. 强数据一致性

业务垂直拆分+功能水平拆分

1. 网关层
2. 业务逻辑层
3. 通用逻辑层
4. 数据访问层
5. 数据库

## 互联网核心技术

### 高可用

#### 技术层面

1. 服务冗余 无状态化
2. 负载均衡 幂等设计
3. 超时机制 异步化设计
4. 降级熔断 数据复制/缓存/sharding
5. 架构拆分、服务治理

#### 管理层面

1. 服务分级：等级标准 一级、二级、三级
2. 事故定级：影响程度定级

案例

网关层

- 具备热切换能力
- 不具备热切换能力 防火墙限制只出不进 IPTABLES

### 服务无状态化

1. 同一服务冗余部署在N个节点上完全对等
2. 请求任何一个服务节点，处理结果完全一样

目的

1. 快速扩容
2. 弹性缩容

案例

用户session

### 服务负载均衡

#### 狭义负载均衡

硬件

1. F5
2. A10
3. Radware

软件

1. LVS 4层
2. Nginx 7层
3. HAProxy

负载均衡算法

- 随机：按权重设置随机概率
- 轮询：按约定后的权重设置轮询比率
- 一致性hash：相同参数的请求总是发到同一节点

#### 广义负载均衡

包含完整的故障处理和恢复机制

1. 故障自动发现
2. 故障服务自动摘除
3. 请求自动重试
4. 服务恢复自动发现

### 服务幂等

#### 按请求分类

读操作：天然幂等

写操作

1. insert
    1. 如果使用自增主键，要考虑业务是否安全，以及数据库主从同步中主库宕机问题
    2. 可以使用业务主键，如使用snowflake
2. update，使用绝对值进行书更新
3. delete，使用绝对值进行数据删除

### 分布式锁

#### 场景

- 防止用户重复下单
- MQ消息去重

MQ 消息去重

1. 发送端去重
2. 消费端去重

发送端去重：

1. 目前只有kafka事务消息支持
2. 从 MQ 本身职责上考虑，MQ 不应该支持含有业务语义的唯一去重

消费端去重，数据的修改行为需要串行处理

如：

- 订单状态变更协同
- 用户和买家同时对订单操作支付和改价

#### 本地锁弊端

多服务节点下不可用

解决方案

1. 共享资源互斥
1. 共享资源串行化

#### 基于Redis的分布式锁

原理：key唯一；串行处理。

实现方式：setnx

存在的问题

1. 单机，一旦Redis挂了，所有服务均获取不到锁
2. Master-Slave模式下，线程1获取到锁后，主节点挂掉后，线程2也可能会获取到锁
3. TTL不可控
4. 本质上分布式锁是CP模型，Redis是AP模型

### 分布式事务

### 服务降级

### 服务限流/熔断

### 服务灰度发布

### 服务全链路压测

### 高并发
