---
title: Netty 初学
icon: fire
category:
  - netty
tag:
  - netty 入门
---

### netty入门(来源于：《Netty权威指南》)

#### 1、NIO/BIO/伪异步IO/AIO/NIO2.0 区别
#### 1.1、BIO，同步阻塞IO，典型代表为：TimeServer
BIO流程图：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/BIO.png)

#### 1.2、伪异步IO
为了解决BIO的弊端，后面加了个线程池来优化，形成M个请求对应N个后端线程，M可以远大于N。
伪异步IO流程图：

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/weiBIO.png)

弊端：网络故障，网络传输缓慢情况下，当调用OutputStream的write方法写输出流的时候，它将会被阻塞。TCP缓冲区数据
满了，window size 窗口大小为0，这时候发送方发送数据将会被接收方拒绝。

ps: TCP协议当中窗口机制分为两种：固定窗口和滑动窗口， 可以看下blog: https://blog.csdn.net/weixin_49782150/article/details/124217243

总结：伪异步I/O实际上仅仅只是对之前I/O线程模型的一个简单优化，它无法从根本上解决同步I/O导致的通信线程阻塞问题。下面我们就简单分析下如果通信对方返回应答时间过长，会引起的级联故障


#### 1.3、NIO（New I/O 或者 Non block I/O JDK1.4引入）
概念:

    缓冲区Buffer: ByteBuffer/DoubleBuffer...
    channel： 全双工，selectableChannel 和 fileChannel，分别是网络流处理和文件处理
    ServerSocketChannel是selectableChannel子类
    selector: 多路复用器，一个多路复用器可以轮训多个channel, jdk使用epoll()代替了select,使得客户端的连接数成千上万。


channel大概类图：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/channel1.png)


NioEvenLoop流程图及时序图：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/NioLoopEventGroup.png)


![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/nettyTimePic.png)

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/netty%E6%97%B6%E5%BA%8F%E5%9B%BE.png)


![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/NioEventLoopGroupTp.png)



#### 1.3.1、NIO服务端主要创建过程：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/niotongxun.png)

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/serversocketchannel.png)

    步骤一：打开ServerSocketChannel，用于监听客户端的连接，它是所有客户端连接的父管道
    步骤二：绑定监听端口，设置连接为非阻塞模式
    步骤三：创建Reactor线程，创建多路复用器并启动线程
    步骤四：将ServerSocketChannel注册到Reactor线程的多路复用器Selector上，监听ACCEPT事件
    步骤五：多路复用器在线程run方法的无限循环体内轮询准备就绪的Key
    步骤六：多路复用器监听到有新的客户端接入，处理新的接入请求，完成TCP三次握手，建立物理链路
    步骤七：设置客户端链路为非阻塞模式
    步骤八：将新接入的客户端连接注册到Reactor线程的多路复用器上，监听读操作，用来读取客户端发送的网络消息
    步骤九：异步读取客户端请求消息到缓冲区
    步骤十：对ByteBuffer进行编解码，如果有半包消息指针reset，继续读取后续的报文，将解码成功的消息封装成Task，投递到业务线程池中，进行业务逻辑编排
    步骤十一：将POJO对象encode成ByteBuffer，调用SocketChannel的异步write接口，将消息异步发送给客户端


#### 1.3.2、NIO客户端主要创建过程：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/netty/NioCLient.png)

    步骤一：打开SocketChannel，绑定客户端本地地址（可选，默认系统会随机分配一个可用的本地地址）
    步骤二：设置SocketChannel为非阻塞模式，同时设置客户端连接的TCP参数
    步骤三：异步连接服务端
    步骤四：判断是否连接成功，如果连接成功，则直接注册读状态位到多路复用器中，如果当前没有连接成功
    （异步连接，返回false，说明客户端已经发送sync包，服务端没有返回ack包，物理链路还没有建立）
    步骤五：向Reactor线程的多路复用器注册OP_CONNECT状态位，监听服务端TCP ACK应答
    步骤六：创建Reactor线程，创建多路复用器并启动线程
    步骤七：多路复用器在线程run方法的无限循环体内轮询准备就绪的Key
    步骤八：接收connect事件进行处理
    步骤九：判断连接结果，如果连接成功，注册读事件到多路复用器
    步骤十：注册读事件到多路复用器
    步骤十一：异步读客户端请求消息到缓冲区？ 读取服务端消息？
    步骤十二：对ByteBuffer进行编解码，如果有半包消息接收缓冲区Reset，继续读取后续的报文，
    将解码成功的消息封装成Task，投递到业务线程池中，进行业务逻辑编排
    步骤十三：将POJO对象encode成ByteBuffer，调用SocketChannel的异步write接口，将消息异步发送给客户端

JDK1.7升级了NIO类库，升级后的NIO类库被称为NIO2.0，引人注目的是，
Java正式提供了异步文件I/O操作，同时提供了与UNIX网络编程事件驱动I/O对应的AIO





















最后比较优秀的blog:

https://blog.csdn.net/qq_19636353/article/details/113804120
