---
title: kafka 初学
icon: fire
category:
  - kafka
tag:
  - kafka 入门
---

### kafka初学
- 结构
  - 分为生产者，消费者，broker, zookeeper, partition, replica

- 生产者
  - 发送消息的三种方式，sync, async, fire-and-forget
  - send 方法必传参数：topic,value， 返回值为future， 可以获取分区，偏移量等信息，也可以通过future实现超时阻塞
  - 发送异常主要分为：NetworkException、LeaderNotAvailableException、UnknownTopicOrPartitionException、NotEnoughReplicasException、NotCoordinatorException
  - send msg 到broker需要经过拦截器，序列化器，分区器，如果没有指定分区，会用默认的mh2得到key的hash值，相同的key会落在相同的分区
    - key注意可以是null和非null两种情况，对于null的情况，全局时间内，null落在缓存中的某个分区中，另外的时间段落在另外的分区上
    - key为null的情况下，Kafka并不是每条消息都随机选择一个Partition；而是每隔topic.metadata.refresh.interval.ms才会随机选择一次！

简单结构：

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/kafka/Saved%20Pictures/kafkacx.png)

分区副本：

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/kafka/Saved%20Pictures/kafkacx2.png)

### kafka调优
  #### kafka客户端
 - buffer.memory：RecordAccumulator 主要用来缓存消息以便 Sender 线程可以批量发送，RecordAccumulator 缓存大小就是这个参数配置的，默认为32M
 - max.block.ms：生产消息过快，会导致send方法阻塞或者抛出异常，一般默认值为：60000，即60S
 - batch.size：主要用来实现ByteBuffer的复用，不过BufferPool只针对特定大小的ByteBuffer进行管理，而其他大小的ByteBuffer不会缓存进BufferPool中，这个特定的大小由batch.size参数来指定
 - linger.ms：固定毫秒发送数据，正常流量下 20ms 就能凑够一个 batch，该参数就应该设置在 20+，因为设置到小于 20ms 会导致 batch 数据还没满就发送，那么 batch 批量发送的意义就不大
 - max.request.size：发送给Kafka服务器请求的最大大小，同时也会限制你一条消息的最大大小也不能超过这个参数设置的值，默认1 mb

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/kafka/Saved%20Pictures/kafkacx3.png)