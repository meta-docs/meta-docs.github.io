# 几种Exchange模式

AMQP协议中的核心思想就是生产者和消费者隔离，生产者从不直接将消息发送给队列。生产者通常不知道是否一个消息会被发送到队列中，只是将消息发送到一个交换机。先由Exchange来接收，然后Exchange按照特定的策略转发到Queue进行存储。同理，消费者也是如此。Exchange 就类似于一个交换机，分发发各个消息到相应的队列中。

RabbitMQ提供了四种Exchange模式：fanout、direct、topic、header。header模式在实际使用中较少，本文只对前三种模式进行比较。

### 1、Fanout Exchange

![image](https://raw.githubusercontent.com/ifcoder/note/master/image/rabbitmq/FanoutExchange.png)
![image](https://raw.githubusercontent.com/ifcoder/note/master/image/rabbitmq/FanoutExchange2.png)

> 所有发送到Fanout Exchange的消息都会被转发到与该Exchange 绑定(Binding)的所有Queue上。Fanout Exchange  不需要处理routing key 。只需要简单的将队列绑定到exchange上。这样发送到exchange的消息都会被转发到与该交换机绑定的所有队列上。类似子网广播，每台子网内的主机都获得了一份复制的消息。

所以，Fanout Exchange 转发消息是最快的。

### 2、Direct Exchange

![image](https://raw.githubusercontent.com/ifcoder/note/master/image/rabbitmq/DirectExchange.png)
![image](https://raw.githubusercontent.com/ifcoder/note/master/image/rabbitmq/DirectExchange2.png)

> 所有发送到Direct Exchange的消息将会转发到被routing key绑定的Queue。  
Direct模式可以使用RabbitMQ自带的Exchange：" "（default Exchange）。所以不需要将Exchange进行任何绑定(binding)操作。 
消息传递时，routing key必须完全匹配，才会被队列接收，否则该消息会被抛弃。

### 3、Topic Exchange

![image](https://raw.githubusercontent.com/ifcoder/note/master/image/rabbitmq/TopicExchange.png)
![image](https://raw.githubusercontent.com/ifcoder/note/master/image/rabbitmq/TopicExchange2.png)
> 所有发送到Topic Exchange的消息被转发到所有关心routing key中指定Topic的Queue上，Exchange 将routing key 和某Topic 进行模糊匹配。此时队列需要绑定一个Topic。  
`#`表示0个或若干个关键词，`*`表示一个关键词。如`log.*`能与`log.warn`匹配，无法与`log.warn.timeout`匹配；但是`log.#`能与上述两者匹配。

所以，Topic Exchange 使用非常灵活。


### 4、Headers Exchange
> Headers Exchange交换器允许匹配AMQP消息的header而非routing key。除此之外，Headers Exchange和Direct Exchange完全一致，但性能会差很多，因此他并不实用，而且几乎再也用不到了。

这个是RabbitMQ 的实际使用的几个场景，熟悉了这个，基本上RabbitMQ也就了解了。http://www.rabbitmq.com/tutorials/tutorial-one-dotnet.html

**性能排序：fanout > direct >> topic。比例大约为11：10：6**