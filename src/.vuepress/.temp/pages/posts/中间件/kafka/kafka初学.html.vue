<template><div><h3 id="kafka初学" tabindex="-1"><a class="header-anchor" href="#kafka初学" aria-hidden="true">#</a> kafka初学</h3>
<ul>
<li>
<p>结构</p>
<ul>
<li>分为生产者，消费者，broker, zookeeper, partition, replica</li>
</ul>
</li>
<li>
<p>生产者</p>
<ul>
<li>发送消息的三种方式，sync, async, fire-and-forget</li>
<li>send 方法必传参数：topic,value， 返回值为future， 可以获取分区，偏移量等信息，也可以通过future实现超时阻塞</li>
<li>发送异常主要分为：NetworkException、LeaderNotAvailableException、UnknownTopicOrPartitionException、NotEnoughReplicasException、NotCoordinatorException</li>
<li>send msg 到broker需要经过拦截器，序列化器，分区器，如果没有指定分区，会用默认的mh2得到key的hash值，相同的key会落在相同的分区
<ul>
<li>key注意可以是null和非null两种情况，对于null的情况，全局时间内，null落在缓存中的某个分区中，另外的时间段落在另外的分区上</li>
<li>key为null的情况下，Kafka并不是每条消息都随机选择一个Partition；而是每隔topic.metadata.refresh.interval.ms才会随机选择一次！</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>简单结构：</p>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/kafka/Saved Pictures/kafkacx.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>分区副本：</p>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/kafka/Saved Pictures/kafkacx2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="kafka调优" tabindex="-1"><a class="header-anchor" href="#kafka调优" aria-hidden="true">#</a> kafka调优</h3>
<h4 id="kafka客户端" tabindex="-1"><a class="header-anchor" href="#kafka客户端" aria-hidden="true">#</a> kafka客户端</h4>
<ul>
<li>buffer.memory：RecordAccumulator 主要用来缓存消息以便 Sender 线程可以批量发送，RecordAccumulator 缓存大小就是这个参数配置的，默认为32M</li>
<li><a href="http://max.block.ms" target="_blank" rel="noopener noreferrer">max.block.ms<ExternalLinkIcon/></a>：生产消息过快，会导致send方法阻塞或者抛出异常，一般默认值为：60000，即60S</li>
<li>batch.size：主要用来实现ByteBuffer的复用，不过BufferPool只针对特定大小的ByteBuffer进行管理，而其他大小的ByteBuffer不会缓存进BufferPool中，这个特定的大小由batch.size参数来指定</li>
<li><a href="http://linger.ms" target="_blank" rel="noopener noreferrer">linger.ms<ExternalLinkIcon/></a>：固定毫秒发送数据，正常流量下 20ms 就能凑够一个 batch，该参数就应该设置在 20+，因为设置到小于 20ms 会导致 batch 数据还没满就发送，那么 batch 批量发送的意义就不大</li>
<li>max.request.size：发送给Kafka服务器请求的最大大小，同时也会限制你一条消息的最大大小也不能超过这个参数设置的值，默认1 mb</li>
</ul>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/kafka/Saved Pictures/kafkacx3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


