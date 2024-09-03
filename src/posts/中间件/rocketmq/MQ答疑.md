---
title: RocketMQ 答疑
icon: fire
category:
  - RocketMQ
tag:
  - 答疑
---


## RocketMq技术答疑

### 1、NS之间的最终一致性，提高集群的稳定性。
> [!important]
> RocketMQ集群一般是指broker集群，但是为了防止NS也宕机，所以NS也是可以做集群。
> 那么多个NS和Broker之间的关系是怎么样的呢？是不是不同集群节点下的broker都需要连接到所有的NS上呢？


### 2、RocketMQ如何保证顺序消费？
> [!important]
> 1、照全局角度顺序消费分为全局和局部，全局就topic只有一个queue,topic如果有多个queue, 那可能只能局部顺序。
> 实际的业务场景来说，顺序都是指的局部顺序，比如相同的订单，相同的运输任务 ID取模后，让相同的需要顺序
> 消费的数据落入到同一个queue中。
> 源码地址：org.apache.rocketmq.client.impl.producer.DefaultMQProducerImpl#sendSelectImpl
>
> 2、如果按照生产者消费者角度，分为生产有序和消费有序，生产有序是生产者把数据落入到同一个queue下，消费有序是指
> 有序消费模式MessageListenerOrderly和并发消费模式MessageListenerConcurrently，
> 简单来说就是消费的时候是单线程还是多线程消费，需要进行控制，以达到顺序消费的目的。
>


### 3、RocketMQ如何进行消息过滤？


