---
title: Netty 进阶
icon: fire
category:
  - netty
tag:
  - netty 进阶
---

### netty进阶

#### 1、基础参数设置，bossGroup,workGroup,businessGroup(handlerGroup)
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/workAndBossGroup.png)

```text
bossGroup： 负责创建监听连接，默认核心数 * 2， ex: bossGroup = new NioEventLoopGroup();
workGroup:  负责建立连接，默认核心数 * 2，ex: new NioEventLoopGroup();
eventExecutorGroup/businessGroup/handlerGroup : 线程数需要自己设置
```

#### 1.1、案例1，不规范使用group/创建group 导致内存溢出
    比如：每次初始化连接都创建线程组，理论上是创建全局线程组，其他的连接复用
    ps:OOM内存溢出，Memory Leak内存泄漏，无法回收对象。ML最终会OOM
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/eventExecutorGroupErr.png)

#### 1.2、案例2，netty 客户端发生内存泄漏
通过MAT分析泄漏时的dump文件，分析后发现主要是NioEventLoop线程中的WriteAndFlush发生内存溢出
WriteAndFlush 是因为创建的发送队列是全局的，发送速度缓慢，导致大量的发送数据堆积导致溢出。


### netty调优

#### 1、ChannelOption
- SO_BACKLOG: 指处理客户端连接繁忙的时候，可以先存入到队列中，队列大小一般为：200（window默认），128（默认），256，512，1024，如果高并发情况下可以调大一点。
- SO_REUSEADDR: 指是否允许共用端口，默认false，端口被占用会直接抛异常。
- SO_KEEPALIVE: 指一段时间后检测tcp连接状态，能检测出假死，网络故障，不稳定，丢包等情况，提高性能。
- TCP_NODELAY: 禁用Nagle算法，立即发送数据，如果对于小包且不需要很强的实时性，可以开启这个设置，提高网络传输的性能。
- SO_SNDBUF: 设置发送缓冲区大小。cat /proc/sys/net/ipv4/tcp_smem查询其大小
- SO_RCVBUF: 设置接收缓冲区大小。cat /proc/sys/net/ipv4/tcp_rmem查询其大小
- ALLOCATOR: 设置内存分配器，可以提高性能。
- CONNECT_TIMEOUT_MILLIS: 连接超时毫秒数，客户端尝试连接的超时时间，一般30s,即30000
- WRITE_BUFFER_HIGH_WATER_MARK：默认值64KB。如果Netty的写缓冲区中的字节超过该值，Channel的isWritable()返回False。
- MAX_MESSAGES_PER_READ：Netty参数，一次Loop读取的最大消息数，对于ServerChannel或者NioByteChannel，
    - 默认值为16，其他Channel默认值为1。默认值这样设置，是因为：ServerChannel需要接受足够多的连接，保证大吞吐量，NioByteChannel可以减少不必要的系统调用select。
- WRITE_SPIN_COUNT: 一个Loop写操作执行的最大次数，默认值为16。
- MESSAGE_SIZE_ESTIMATOR：消息大小估算器，默认为DefaultMessageSizeEstimator.DEFAULT
- SINGLE_EVENTEXECUTOR_PER_GROUP：单线程执行ChannelPipeline中的事件，默认值为True。
- SO_LINGER： 当用户调用close（）方法的时候，函数返回，尽量发送数据，不一定保证会发送剩余的数据，造成了数据的不确定性，使用SO_LINGER可以阻塞close()的调用时间，直到数据完全发送
- RCVBUF_ALLOCATOR：用于Channel分配接受Buffer的分配器，默认值为AdaptiveRecvByteBufAllocator.DEFAULT，是一个自适应的接受缓冲区分配器，能根据接受到的数据自动调节大小。可选值为FixedRecvByteBufAllocator，固定大小的接受缓冲区分配器。
-
