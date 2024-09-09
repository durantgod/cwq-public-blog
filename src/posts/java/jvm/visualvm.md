---
title: visualVm
icon: fire
category:
  - 工具
tag:
  - visualvm 分析工具
---

# visualVm

1、JDK14起，已不再集成visualvm，需要自己去visualvm官网下载。

下载地址：https://visualvm.github.io/

2、下载完成后，在etc文件夹下找到visualvm.conf文件，打开，并设置jdk路径。
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/visualvmConfig.png)

### visualVm 远程调试
```shell
java \
#指定JMX RMI (Remote Method Invocation) 通信所使用的端口号
-Dcom.sun.management.jmxremote.rmi.port=1232 \
#指定JMXMP (JMX Messaging Protocol) 通信所使用的端口号
-Dcom.sun.management.jmxremote.port=1232 \
#不使用ssl
-Dcom.sun.management.jmxremote.ssl=false \
#不启用身份认证
-Dcom.sun.management.jmxremote.authenticate=false \
-jar ${你的jar包名}.jar

```

### 安装插件使用visualGC 查看GC的暂停时间，GC频率
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/visualGC.png)

### GC内容详解
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/GCdetail.png)

主要分为三大部分：Spaces(内存空间)，Graphs（图解，GC具体值），Histogram（柱状图）

- Compile Time: JIT即时编译器编译文件耗时，主要是是把字节码文件编译为机器语言执行，如果同一段代码被重复编译会被标注为热点代码，编译为为本地代码，编译会消耗程序正常的运行时间。
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jvm/complieTime.png)

- Class Loader Time：class文件loaded 和 unload 消耗的时间
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jvm/loadTime.png)

- Gc Time：GC发生的次数，包括 minGc 和 FullGC，GC耗时时间。
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jvm/GcTime.png)

- Eden space：新生代内存最大7.961G，已分配76M, 已使用16M，发生30次GC，时间为186.51ms
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jvm/edSpace.png)

- Survivor, old Gen, MetaSpace: 新生代/老年代/元空间 最大内存分配，已分配空间，已使用空间。
![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jvm/seMetaSpace.png)


### 记录一次OOM线上问题，以及dump prof文件分析内存泄露情况，发现 GCRoot 指向的是 arrayList<Object> 对象，具体代码是不断往全局list中存放对象而没有及时释放。

  ```shell
  # 设置OOM时，导出prof文件，56m堆内存只是演示数据，理论上还要有新生代，老年代内存及占比，适度调整老年代内存
  -Xms56m -Xmx56m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=heapsump.prof
  ```

- 使用jvm分析工具  visualvm 分析内存溢出的根本原因，如下截图：
  - ![img.png](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/vitool.png)