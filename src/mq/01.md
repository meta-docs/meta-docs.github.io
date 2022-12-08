# RabbitMQ简介

### 1、介绍

RabbitMQ是一个由erlang开发的基于AMQP（Advanced Message Queue ）协议的开源实现。用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面都非常的优秀。是当前最主流的消息中间件之一。

RabbitMQ官网：http://www.rabbitmq.com

### 2、AMQP

即Advanced Message Queuing Protocol,一个提供统一消息服务的应用层标准高级消息队列协议,是应用层协议的一个开放标准,为面向消息的中间件设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同的开发语言等条件的限制。  

消息中间件主要用于组件之间的解耦，消息的发送者无需知道消息使用者的存在，同样，消息使用者也不用知道发送者的存在。AMQP的主要特征是面向消息、队列、路由（包括点对点和发布/订阅）、可靠性、安全。

为什么要使用RabbitMQ？
- 异步
- 解耦
- 高并发缓冲

### 3、系统架构 

![系统架构](https://raw.githubusercontent.com/ifcoder/note/master/image/rabbitmq/RabbitMQ-系统架构.jpeg)

消息队列的使用过程大概如下：
1. 客户端连接到消息队列服务器，打开一个channel。
2. 客户端声明一个exchange，并设置相关属性。
3. 客户端声明一个queue，并设置相关属性。
4. 客户端使用routing key，在exchange和queue之间建立好绑定关系。
5. 客户端投递消息到exchange。exchange接收到消息后，就根据消息的key和已经设置的binding，进行消息路由，将消息投递到一个或多个队列里。

如上图所示：AMQP里主要说两个组件：Exchange和Queue。绿色的X就是Exchange ，红色的是Queue ，这两者都在Server端，又称作Broker，这部分是RabbitMQ实现的，而蓝色的则是客户端，通常有Producer和Consumer两种类型。

### 4、几个概念
- Broker： 简单来说就是消息队列服务器实体
- Producer：数据的发送方。
- Consumer：数据的接收方。
- Exchange：消息交换机，它指定消息按什么规则，路由到哪个队列。
- Queue：消息队列载体，每个消息都会被投入到一个或多个队列。
- Binding：绑定，它的作用就是把exchange和queue按照路由规则绑定起来。
- Routing Key：路由关键字，exchange根据这个关键字进行消息投递。
- vhost：虚拟主机，一个broker里可以开设多个vhost，用作不同用户的权限分离。（注意：vhost是AMQP中唯一无法通过AMQP协议创建的基元）
- channel：消息通道，在客户端的每个连接里，可建立多个channel，每个channel代表一个会话任务。

