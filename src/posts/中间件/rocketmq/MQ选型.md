---
title: RocketMQ 选型
icon: fire
category:
  - RocketMQ
tag:
  - 选型
---


# RocketMq与Kafka选型

### RocketMq与Kafka选型
    01.两者的相同点
    02.部署架构不同
    03.工作流程不同
    04.日志存储方式不同
    05.保证消息顺序消息的方法是否相同
    06.消息重复机制不同
    07.是否支持延时消息
    08.消息过滤方式不同
    09.消息失败支持重试吗？
    10.事务不同
    11.是否支持回溯消费？
    12.高可用机制不同
    13.性能不同？
    14.社区活跃度
    15.其他方面不同



首先来看看两者的相同之处
#### 01.两者的相同点
    两者底层原理有很多相似之处，RocketMQ借鉴了Kafka的设计
    两者均采用顺序写、零拷贝机制进行写消息与发送消息，极大地保证了系统的性能


#### 02.部署架构不同
    Kafka的部署架构
    看下面这幅Kafka部署架构图
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/kafkajg.png)

    1）图中，除了包含前面说到的生产者Producer、Kafka集群以及消费者Consumer三个角色之外，还包含了用于存储信息的注册中心-Zookeeper
    2）生产者：用于发送消息的客户端
    3）broker集群：用于消息的存储、转发。负责接收从生产者发送来的消息并存储，供消费者来获取消息。
    3）消费者：用于消费消息的客户端
    4）消费者组：kafka的消费者角色，还有消费者组的概念，也就是说每个消费者组中可以包含多个consumer。其中，Kafka规定，消费者组中的消费者不能同时消费topic中的同一分区
    5）Zookeeper：用于存储信息
    
    存储两部分信息：
    broker信息：各个broker的服务器信息和Topic信息
    消费者信息：主要存储每个消费者消费的Topic的offset的值
    
    
    因此在部署的过程中，Broker就需要配置Zookeeper的地址信息，并作为客户端与Zookeeper保持心跳
    需要注意的是，Kafka在0.9版本之前，Consumer默认将Offset保存在 Zookeeper 中，从0.9版本开始，Consumer默认将Offset 保存在Kafka一个内置的Topic(__consumer_offsets)中
    
    那么，为什么要这样做呢？
    这样消费者就不用每次去broker读消息之前，还要先去Zookeeper拿到自己当前消费的位置，再去broker进行继续读取，而是直接去broker去取这个offset值，然后消费即可。减少了一次通讯，性能也多少会有点改善~
    6）broker:即Kafka集群的一台机器，可包含多个Topic
    7）Topic : 主题，可以理解为一个队列
    8）Partation: 队列Topic的分区，一个Topic可以分为多个分区，用于高并发场景的负载功能；实际上Topic只是一个逻辑概念，真正存在的是分区。
    
    分区将会平均分布在broker上，存在leader与follower两种角色，而生产者和消费者都是直接面向leader分区进行发送消息和获取消息，follower则会去leader中拉取消息，进行消息的备份，这样保证了一定的可靠性。假如leader节点所在的broker挂了，就会进行重新选举一个leader分区出来


#### 2 RocketMq
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/rocketmq.png)

    这个是rocketMq的集群架构图，里面也包含了四个主要部分：NameServer集群,Producer集群,Cosumer集群以及Broker集群
    1）NameServer 担任路由消息的提供者。生产者或消费者能够通过NameServer查找各Topic相应的Broker IP列表分别进行发送消息和消费消息。nameServer由多个无状态的节点构成，节点之间无任何信息同步
    broker会定期向NameServer以发送心跳包的方式，轮询向所有NameServer注册以下元数据信息：
    broker的基本信息（ip port等）
    主题topic的地址信息
    broker集
    存活的broker信息
    filter 过滤器
    也就是说，每个NameServer注册的信息都是一样的，而且是当前系统中的所有broker的元数据信息
    2）Producer负责生产消息，一般由业务系统负责生产消息。一个消息生产者会把业务应用系统里产生的消息发送到broker服务器。RocketMQ提供多种发送方式，同步发送、异步发送、顺序发送、单向发送。同步和异步方式均需要Broker返回确认信息，单向发送不需要
    3）Broker，消息中转角色，负责存储消息、转发消息。在RocketMQ系统中负责接收从生产者发送来的消息并存储、同时为消费者的拉取请求作准备
    4）Consumer负责消费消息，一般是后台系统负责异步消费。一个消息消费者会从Broker服务器拉取消息、并将其提供给应用程序。从用户应用的角度而言提供了两种消费形式：拉取式消费、推动式消费。同时，与Kafka类似，RocketMq也同样有消费者组的概念
    此外，RocketMq同样存在Broker、Topic以及Partation概念，且概念基本一致
    总结
    
    1、Kafka和RocketMq部署架构大致类似，均包含生产者、消费者、broker集群以及注册中心四个部分。只是Kafka使用的是Zookeeper来协调节点，而RocketMq则采用的是自研的NameServer
    2、那就主要来看看NamseServer和Zookeeper有何不同。其实 RocketMQ 的早期版本使用的也是Zookeeper，后来更换为自己实现的NameServer
    
    Kafka使用Zookeeper，是因为前面也提到了Kafka需要进行分区的leader角色的选举。当leader挂了所在的broker挂了，将会经过两步操作：第1步，先通过Zookeeper在所有机器中，选举出一个KafkaController；第2步，再由这个Controller，选择出leader
    而RocketMq的集群部署都是物理上的master和slave的broker节点，master会将消息复制到slave节点。写消息时，若master节点挂了，就会直接将消息发到其他master节点；若在读消息的时候出现master节点挂了，就会去slave节点读取消息。根本不需要选举，因此就直接使用NameServer这一轻量级工具来进行信息的存储就好了
    
    3、此外，broker集群部署方式上还有一些差别。Kafka只支持一种集群部署方式，只需要独立启动多个broker节点，指定相同的集群名称即可。broker之间并没有主从关系（会有一个KafkaController来进行leader分区的选举），只是各个topic中的分区之间会存在主从关系
    
    而RocketMq则支持四种部署方式：
    
    1）单Master
    单机模式, 即只有一个Broker, 如果Broker宕机了, 会导致RocketMQ服务不可用, 不推荐使用
    
    2）多Master模式
    组成一个集群, 集群每个节点都是Master节点, 配置简单, 性能也是最高, 某节点宕机重启不会影响RocketMQ服务
    
    缺点：如果某个节点宕机了, 会导致该节点存在未被消费的消息在节点恢复之前不能被消费
    
    3）多Master多Slave模式，异步复制
    每个Master配置一个Slave, 多对Master-Slave, Master与Slave消息采用异步复制方式, 主从消息一致只会有毫秒级的延迟
    
    优点是弥补了多Master模式（无slave）下节点宕机后在恢复前不可订阅的问题。在Master宕机后, 消费者还可以从Slave节点进行消费。采用异步模式复制，提升了一定的吞吐量。总结一句就是，采用
    多Master多Slave模式，异步复制模式进行部署，系统将会有较低的延迟和较高的吞吐量
    
    缺点就是如果Master宕机, 磁盘损坏的情况下, 如果没有及时将消息复制到Slave, 会导致有少量消息丢失
    
    4）多Master多Slave模式，同步双写
    与多Master多Slave模式，异步复制方式基本一致，唯一不同的是消息复制采用同步方式，只有master和slave都写成功以后，才会向客户端返回成功
    
    优点：数据与服务都无单点，Master宕机情况下，消息无延迟，服务可用性与数据可用性都非常高
    
    缺点就是会降低消息写入的效率，并影响系统的吞吐量
    
    实际部署中，一般会根据业务场景的所需要的性能和消息可靠性等方面来选择后两种

#### 03.可靠性不同

RocketMq分别支持同步异步复制和同步异步刷盘两种机制的配置，针对这两种机制，我们分别来了解一下

1）同步异步复制

同步异步复制区别在于消息发送到master节点，是否会等待向slave节点复制结束再返回

a 同步复制
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/tb.png)

当生产者将消息发送到broker的master节点时，master会首先将消息复制到slave节点，等待复制动作完成之后，才会给客户端返回“发送成功”的响应，消息可靠性得到保证



b 异步复制
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/yb.png)



当生产者将消息发送到broker的master节点时，会直接返回一个发送成功的状态响应，并不会等待复制动作的结束，消息可靠性不够高，因为可能会出现网络抖动，导致复制不成功，消费者消费消息不及时的情况

2）同步异步刷盘

同步异步刷盘的区别在于，消息存储在内存（memory）中以后，是否会等待执行完刷盘动作再返回，即是否会等待将消息中的消息写入磁盘中

a 异步刷盘
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/ybsp.png)

在返回写成功状态时，消息可能只是被写入了内存，并不会等待消息从内存中写入磁盘就返回。所以写操作的返回快，吞吐量大；当内存里的消息量积累到一定程度时，统一触发写磁盘操作，快速写入



b 同步刷盘

![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/tbsp.png)

在返回写成功状态时，消息已经被写入磁盘。具体流程是，消息写入内存之后，会立刻通知刷盘线程刷盘，然后等待刷盘完成，刷盘线程执行完成后唤醒等待的线程，返回消息写成功的状态



实际生产中，该如何选择这两种机制的配置呢？权衡性能和可靠性两方面，建议使用异步刷盘，同步复制的形式进行配置，这样即使有一台机器出故障，仍然可以保证数据不丢



而Kafka则只支持异步复制，异步刷盘的机制，虽然在性能上会远远大于RocketMq配置同步复制，同步刷盘的情况，但可靠性会差很多，一旦操作系统出现问题，或者master节点出现故障，数据未及时写入slave节点，数据就很有可能丢失。因此对于一些对数据的可靠性要求比较高的业务场景，可以采用RocketMq而不是Kafka



### 04.工作流程不同

    RocketMq的工作流程如下：
    
    1）首先启动NameServer。NameServer启动后监听端口，等待Broker、Producer以及Consumer连上来
    
    2）启动Broker。启动之后，会跟所有的NameServer建立并保持一个长连接，定时发送心跳包。心跳包中包含当前Broker信息(ip、port等)、Topic信息以及Borker与Topic的映射关系
    
    3）创建Topic。创建时需要指定该Topic要存储在哪些Broker上，也可以在发送消息时自动创建Topic
    
    4）Producer发送消息。启动时先跟NameServer集群中的其中一台建立长连接，并从NameServer中获取当前发送的Topic所在的Broker；然后从队列列表中轮询选择一个队列，与队列所在的Broker建立长连接，进行消息的发送
    
    5）消息到达Broker的master节点。当配置为同步复制时，master需要先将消息复制到slave节点，然后再返回“写成功状态”响应给生产者；当配置为同步刷盘时，则还需要将消息写入磁盘中，再返回“写成功状态”；要是配置的是异步刷盘和异步复制，则消息只要发送到master节点，就直接返回“写成功”状态
    
    6）Consumer消费消息。跟其中一台NameServer建立长连接，获取当前订阅的Topic存在哪些Broker上，然后直接跟Broker建立连接通道，进行消息的消费
    
    Kafka与RocketMq基本类似，有两点不太一样的地方：发送过程和消息到达broker的处理
    
    a 发送过程
    
    生产者调用了Kafka发送消息的方法，并不会立即将消息发送到broker,而是会先将消息缓存到producer，缓存到一定大小之后，再统一发送到broker，这点也是Kafka性能比较高的一大原因
    
    b 消息到达Broker的master节点
    
    kafka使用异步刷盘，异步复制，当消息到达Broker的master节点，便会立即返回“写成功”的状态给生产者客户端
