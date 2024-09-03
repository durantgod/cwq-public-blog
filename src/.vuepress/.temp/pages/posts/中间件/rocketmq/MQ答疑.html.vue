<template><div><h2 id="rocketmq技术答疑" tabindex="-1"><a class="header-anchor" href="#rocketmq技术答疑" aria-hidden="true">#</a> RocketMq技术答疑</h2>
<h3 id="_1、ns之间的最终一致性-提高集群的稳定性。" tabindex="-1"><a class="header-anchor" href="#_1、ns之间的最终一致性-提高集群的稳定性。" aria-hidden="true">#</a> 1、NS之间的最终一致性，提高集群的稳定性。</h3>
<blockquote>
<p>[!important]<br>
RocketMQ集群一般是指broker集群，但是为了防止NS也宕机，所以NS也是可以做集群。<br>
那么多个NS和Broker之间的关系是怎么样的呢？是不是不同集群节点下的broker都需要连接到所有的NS上呢？</p>
</blockquote>
<h3 id="_2、rocketmq如何保证顺序消费" tabindex="-1"><a class="header-anchor" href="#_2、rocketmq如何保证顺序消费" aria-hidden="true">#</a> 2、RocketMQ如何保证顺序消费？</h3>
<blockquote>
<p>[!important]<br>
1、照全局角度顺序消费分为全局和局部，全局就topic只有一个queue,topic如果有多个queue, 那可能只能局部顺序。<br>
实际的业务场景来说，顺序都是指的局部顺序，比如相同的订单，相同的运输任务 ID取模后，让相同的需要顺序<br>
消费的数据落入到同一个queue中。<br>
源码地址：org.apache.rocketmq.client.impl.producer.DefaultMQProducerImpl#sendSelectImpl</p>
<p>2、如果按照生产者消费者角度，分为生产有序和消费有序，生产有序是生产者把数据落入到同一个queue下，消费有序是指<br>
有序消费模式MessageListenerOrderly和并发消费模式MessageListenerConcurrently，<br>
简单来说就是消费的时候是单线程还是多线程消费，需要进行控制，以达到顺序消费的目的。</p>
</blockquote>
<h3 id="_3、rocketmq如何进行消息过滤" tabindex="-1"><a class="header-anchor" href="#_3、rocketmq如何进行消息过滤" aria-hidden="true">#</a> 3、RocketMQ如何进行消息过滤？</h3>
</div></template>


