---
title: Jvm总览
icon: fire
category:
  - jvm
tag:
  - Jvm
---



::: tabs


@tab Jvm堆内存

# 1、Jvm堆内存


### 1.1、内存参数设置
```text
jvm 内存主要是堆内存，存储对象。堆内存主要由新生代和老年代组成。
新生代：Eden, S0(from), S1(to)
老年代：Old/Tenured

新生代老年代默认比例：-XX：NewRatio = 2，表示新生代占1，老年代占2
新生代中E,S,S 大概比例为：6:1:1（不一定，会自动调整）

常用的JVM设置参数：Xms（初始）,Xmx（最大） 主要是指堆内存的空间。
一般初始：1/64物理内存
一般最大：1/4物理内存
注意：生产一般会设置成一样的，主要是缓解内存伸缩带来额外的开销。


Eden发生YoungGC、MinorGC,
第一次发生GC，对象由Eden回收，没有回收到的就移动到S0（对象计数1）

第二次发生GC，对象从Eden/S0移动到 S1，这时候S0、Eden没有数据，S1有数据（对象计数 + 1）

第三次发生GC，对象从S1移动到S0，计数+1

...
次数达到15次就进入Old区

Old区满，发生FullGc

FullGc后内存还是不够发生OOM
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/jvmesso.jpg)


### 1.2、对象分配内存流程

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/jvm%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg)


# 2、Jvm常用命令
```shell
1、jps 查看进程
2、jstat
 jstat -gc 15744 ## 查看GC信息，Jvm内存占用情况

3、jmap
 ## 打印的信息分别为：共享对象的起始地址、映射大小、共享对象路径的全程。
 jmap 15744 ## 主要用于打印指定java进程的共享对象内存映射或堆内存细节 
 
 jmap -heap pid  ## 查看堆使用情况
 map -histo pid  ## 查看堆中对象数量和大小
 
```




@tab:active JVM1.8内存分布
1、内存模型

    程序计数器：保存当前线程执行的字节码位置
    堆：存放对象的实例，没有空间，会抛出OOM异常
    栈、虚拟机栈：存放局部变量，动态链接，操作栈，方法出口等信息，调用方法都会创建栈
    本地方法栈：和虚拟机栈基本相同，但是本地是指native方法

    以下两个不在JVM虚拟机中

    方法区：又称非堆区，存储类信息，常量，静态变量等数
    本地内存：分为元空间和直接内存
    元空间：1.7的永久代和1.8的元空间，是方法区的一种实现

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/jvm2.jpg)
2、GC

    分代回收：年轻代，老年代，持久代
    回收器：串行回收器，并行回收器ParallelGC（默认）, CMS, G1, ZGC
    
    GC调优调优参数：
    [堆栈相关]： -Xms 初始堆大小；Xmx 最大堆大小；Xmn年轻代大小；Xss 每个线程堆栈大小；XX:NewSize 年轻代大小....
    [垃圾收集器相关]： -XX:+UseParallelGC: 并行收集器; -XX:ParallelGCThreads=20 配置并行收集器的线程数

    若满足一下条件，则GC一般不需要优化。
    ■ Minor GC执行时间不超过50ms;
    ■ Minor GC执行不频繁，大概10秒执行一次；
    ■ Full GC执行时间不到1s;
    ■ Full GC执行频率不算频繁，不低于10分钟1次。

    GC的两种判定方法：
    1、引用链法
    2、引用计数法（对象被引用就+1，删除引用-1，但是无法解决相互引用的情况）
    3.GC 的三种收集方法：标记清除、标记整理、复制算法的原理与特点，分别用在什么地方，如果让你优化收集方法，有什么思路？
        CMS基于标记清除：先标记，再清除，效率不高，会产生碎片。
        G1局部看，使用了复制算法：分为8:1的eden区和surviver,也就是YGC
        G1基于标记整理：标记完毕后，让所有已存活的对象向一端移动。

    4、新生代内存不够时发生MiniorGC，也叫YGC，JVM内存不够时发生FGC
    5、jstack查看当前栈信息，jmap查看当前内存，jhat查看dump堆信息，mat

3、类加载

    ■ 双亲委派机制（自底向上检查是否已被加载，自上向下加载类）
    ■ Bootstrap类加载器 \lib目录下的类
    ■ Extension类加载器 \lib\ext下的类
    ■ AppLication类加载器  扫描包下的类
    ■ 自定义类加载器（不打破双亲委派重写findClass，无法被父类加载的都会在这里加载，打破双亲就重写findClass）
    ■ 类加载的过程：加载loading -- 链接Linking :（验证 - 准备 - 解析） -- 初始化

4、性能调优

    jvm参数：看2
    性能分析工具：MAT,JMC,jstack,Jstat

5、编译器优化

    公共子表达式的消除
    指令重排
    内联
    逃逸分析
    栈上分配
    同步消除

6、执行模式

    解释模式
    编译模式
    混合模式


常见问题：

    1、什么是指针碰撞？ 堆内存中分配内存时指针挪动分配的方式。
    2、什么是空闲列表？不是规整的内存分配方式， 虚拟机需要维护一个列表，记录内存可用，分配时在列表上找到空闲的内存。这种分配方式叫空闲列表。
    3、什么是TLAB? java堆中预先分配的一下块内存，本地线程分配缓存。 -XX:UseTLAB
    4、如何选择垃圾收集器？堆内存不是很大或者是单核的机器，选择串行收集器。参数：-XX:+UseSerialGC。其他场景用并行收集器。
        如果应用对响应时间要求较高，想要较少的停顿，甚至1秒都会引起失败。那么ZGC, CMS, G1都是合理的。1.8默认的是并行收集器。
    5、内存泄露和内存溢出
        内存溢出OOM：已经没有内存空间分配了，调整堆区内存大小. for循环中用数组不断添加元素
        内存泄漏memory leak：引用的对象不会被回收，可能导致内存泄漏
    6、强弱软引用
        平时使用 Object o = new O();就是强引用，用SoftRefrence，WeakRefrence, PhantomReference
    7、如何判断一个对象是否存活？引用计数法和可达性算法（引用链法）
    8、jps,jinfo
        # 现在的环境变量
        jinfo -sysprops pid
        # 曾经的环境变量
        jinfo -flags pid 或者 jinfo -flags *** pid : ***表示参数





@tab jcmd
1.1、 在JDK1.7以后，新增了一个命令行工具jcmd。它是一个多功能的工具，可以用来实现前面除了jstat之外所有命令的功能，比如用它来导出堆、内存使用、查看Java进程、导出线程信息、执行GC、JVM运行时间等。jcmd拥有jmap的大部分功能，并且官方也推荐使用jcmd命令代替jmap命令。
```shell
 jcmd 15008  help # 查看jcmd支持的相关操作，如下图1
 
 jcmd 15008 VM.uptime # 查看jvm启动时间
 
 jcmd 15008 Thread.print # 打印线程堆栈信息
 
 jcmd 15008 GC.class_histogram # 查看系统中类的统计信息
 
 jcmd 15008 GC.heap_dump D:\d.hprof # 和jmap dump 功能差不多，也会进行一次FGC？
 
 jcmd 15008 VM.flags # 获取启动参数
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jcmdhelp.png)

#### 2、jstatd：远程主机信息收集
之前的指令只涉及监控本机的Java应用程序，而在这些工具中，
一些监控工具也支持对远程计算机的监控（如jps、jstat）。
为了启用远程监控，则需要配合使用jstatd工具。命令jstatd是一个RMI服务端程序，
它的作用相当于代理服务器，建立本地计算机与远程监控工具的通信。jstatd服务器将本机的
Java应用程序信息传递到远程计算机。执行原理如图21-34所示。图21-34　jstatd执行原理图
直接打开jstatd服务器可能会抛出访问拒绝异常，这是因为jstatd程序没有足够的权限，

参考：https://www.cnblogs.com/duanxz/archive/2012/10/25/2738831.html





@tab jinfo
1、jinfo指令的命令格式为： jinfo  [ options ] pid

| 选项               | 说明                                          |
|------------------|---------------------------------------------|
| no option        | 输出所有的参数和系统属性，包括默认值                          |
| -flag name       | 输出对应名称的参数                                   |
| -flag [+-]name   | 开启或者关闭对应参数名称的参数，只有标记为manageable 的参数才可以被动态修改 |
| -flag name=value | 修改对应参数的值                                    |
| -flags           | 输出全部的参数                                     |
| -sysprops        | 输出系统属性，system.getProperties()               |



1.1、 jinfo
```shell
 jinfo -flags 24916 # 输出参数

 #查看JVM是否使用了ParallelGC垃圾收集器
 jinfo –flag UseParallelGC 15008
 
  #新生代对象晋升到老年代对象的最大年龄
 jinfo -flag MaxTenuringThreshold 15008
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfo.png)
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfoflags.png)





@tab jmap
1、jmap指令的命令格式为：jmap [options] pid

| 选项             | 说明                                                                                      |
|----------------|-----------------------------------------------------------------------------------------|
| -heap          | 查看进程堆内存使用情况，包括使用的GC算法、堆配置参数和各代中堆内存使用情况                                                  |
| -histo         | 查看堆内存中的对象数目、大小统计直方图，如果带上live则只统计活对象并且会强制执行一次GC                                          |
| -dump          | 用jmap把进程内存使用情况dump到文件中，再用jhat分析查看，通常在写dump文件前会触发一次Full GC，所以dump文件里保存的都是Full GC后留下的对象信息 |
| -dump:live     | 保存堆中存活对象                                                                                |
| -clstats       | 显示Java堆中元空间的类加载器的统计信息                                                                   |
| -finalizerinfo | 显示在F-Queue中等待Finalizer线程执行finalize方法的对象                                                 |
| -F             | 当dump命令不响应的时候，可以强行dump                                                                  |


1.1、 jmap
```shell
jmap 22492  # 显示Java虚拟机进程的内存映像信息
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmap.png)



1.2、jmap -heap
```shell
jmap -heap 22492 # 指定的垃圾回收算法的信息, 堆的配置信息
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmap1.png)

```text
解读：可以看到JVM版本，并行垃圾回收器，以及堆内存配置，最大80M，NewRatio比例2，SurvivorRatio比例8。
```


1.3、 jmap -histo[:live]
```shell
jmap -histo 22492 # 显示Java堆中对象的统计信息，包括：对象数量、占用内存大小(单位：字节)和类的完全限定名
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmaphisto.png)

```shell
jmap -histo:live 22492 # 显示存活对象，并且会执行一次GC，FGC？
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmaphistolive.png)


1.4、jmap -dump
```shell

# 手动模式
     #手动获取堆内存全部信息
     jmap -dump:format=b,file=D:/dump.hprof 22492
     jmap -dump:live,format=b,file=<filename.hprof><pid>
     
# 主动模式（当OOM时dump当时的快照）
    -XX:+HeapDumpOnOutOfMemoryError：在堆溢出的时候可以储存快照
    -XX:HeapDumpPath=d:/dumps/：导出内存快照时保存的路径

```
MAT工具下载：https://eclipse.dev/mat/previousReleases.php
jdk1.8下载1.11.0版本，新版本需要jdk11

mat具体使用：https://blog.csdn.net/qq_33204709/article/details/128029367

具体：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/mat.png)
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/mat2.png)

### 2 jhat:JDK自带堆分析工具
```shell
     jhat  [ options ] [ hostid ]

     jhat d:\autoDump.hprof # 分析jmap dump 出来的文件，默认7000 端口
     
     jhat -port <port_number> <heap_dump_file> # 可以加上自定义端口
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jhat.png)
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jhathistogram.png)



@tab jstack
#### 1、jstack指令的命令格式为：jstack [ option ] pid

| 选项        | 说明                      |
|-----------|-------------------------|
| -F        | 不影响当前请求情况下，强制输出线程堆栈     |
| -l        | 除了堆栈外，显示关于锁的附加信息        |
| -m        | 如果调用本地方法，可以显示C/C++的堆栈信息 |
| -h        | 获取帮助                    |


1.1、 jstack
```shell
jstack 24916

jstack 62977 | grep "waiting" | awk '{print $1}' # 查询关键信息，或者子线程信息

jstack 62977 |grep 'nid' -C5 -color # 颜色标注
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jstack.png)




@tab jstat

### 1、JVM调优，性能分析命令
1、jstat指令的命令格式为：jstat [options] pid [interval] [count]

| 选项              | 说明                         |
|-----------------|----------------------------|
| -gc             | 统计垃圾回收的堆信息，单位为空间字节数，即单位为KB |
| -gcutil         | 统计垃圾回收的堆信息，单位为空间的百分比       |
| -class          | 统计类加载器的信息                  |
| -compile        | 统计编译行为信息                   |
| -gccapacity     | 统计不同区域（新生代、老年代、永久代）的堆容量信息  |
| -gccause        | 统计引起垃圾回收的事件                |
| -gcnew          | 统计垃圾回收时，新生代的情况             |
| -gcnewcapacity  | 统计垃圾回收时，新生代堆空间容量           |
| -gcold          | 统计垃圾回收时，老年代的情况             |
| -gcoldcapacity  | 统计垃圾回收时，老年代堆空间容量           |
| -gcpermcapacity | 统计垃圾回收时，永久代的堆空间容量          |

1.1、 jstat -gc
```shell
jstat -gc 61971 1000 10  # 统计垃圾回收的堆信息 每秒打印进程1994gc信息，打印10次
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/jstat1.png)
```shell

S0C：第一个幸存区的大小，单位KB
S1C：第二个幸存区的大小
S0U：第一个幸存区的使用大小
S1U：第二个幸存区的使用大小
EC：伊甸园区的大小
EU：伊甸园区的使用大小
OC：老年代大小
OU：老年代使用大小
MC：方法区大小
MU：方法区使用大小
CCSC:压缩类空间大小
CCSU:压缩类空间使用大小
YGC：年轻代垃圾回收次数
YGCT：年轻代垃圾回收消耗时间，单位s
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间，单位s
GCT：垃圾回收消耗总时间


解读：
1、S0C如果是空的，说明开启了指针压缩。实际上java1.8默认是开启了指针压缩
如果要关闭指针压缩可以使用：java -XX:-UseCompressedOops -jar your-application.jar
指针压缩相关blog: https://www.cnblogs.com/star95/p/17512212.html

2、S1C为：16284KB, EC区为：196608KB OC：147456KB
比例：S0C:S1C:EC = 0:1:12
S1C+EC : OC = 1.44 (这个比例怎么这么奇怪？后续可以看看参数设置和默认值是多少)
(这个问题能从《剑指JVM》中7.8找到)

```
IDEA设置运行最大堆内存，最小堆内存为80M，再运行命令看看，截图如下：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gc80m.png)

S0C+S1C+EC = 80m
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gcbl.png)



1.2、jstat -gcutil
```shell
jstat -gcutil 22492 1000 # 统计垃圾回收的堆信息，单位为空间的百分比
```
模拟产生OOM的过程，需要Jmeter 和 设置IDEA 分配的内存。

Jmeter安装教程：https://www.cnblogs.com/luoshuai7394/p/17932334.html

设置截图：右键新增线程组，新增tcp取样器，新增监听器查看结果树
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmetertcp.png)


```text
S0：幸存1区当前使用比例
S1：幸存2区当前使用比例
E：伊甸园区使用比例
O：老年代使用比例
M：元数据区使用比例
CCS：压缩类使用比例
YGC：年轻代垃圾回收次数
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间
```
通过压测可以看到老年代使用比例达到了99%，100%。从而发生了OOM。

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gcutil1.png)


1.3、 jstat -gccause
```shell
jstat -gccause 22492 1000 # 统计引起垃圾回收的事件
```

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gccause.png)

```text
S0：幸存1区当前使用比例
S1：幸存2区当前使用比例
E：伊甸园区使用比例
O：老年代使用比例
M：元空间使用比例
CCS：压缩类使用比例
YGC：年轻代垃圾回收次数
YGCT：年轻代垃圾回收所用的时间
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收所用的时间
GCT：垃圾回收的所用的总时间
LGCC：上次垃圾回收的原因
GCC：当前垃圾回收的原因

解读：
FGC FGCT GCT 无论是FGC的次数还是频率，还是耗时都是逐渐在上升。从840-1100，说明对象一直被引用没有被释放。从而导致OOM

LGCC： Allocation Failure（内存分配失败，没有空间分配，
个人理解：图中YGC没有变化，说明新生代向老年代存储的时候，老年代空间不够导致FGC一直执行）

GCC：Ergonomics (“人体工程学”，jvm中是自适应调整的意思。默认开启了UseAdaptiveSizePolicy，jvm自动调解gc暂停时间
和吞吐量之间的平衡，进行自适应调整引发的gc。)
```

1.4、 常用参数
```text
-Xms：程序启动时占用的内存大小，此值可以和-Xmx相同，避免每次垃圾回收后重新分配内存
-Xmx：程序运行时的最大可占用的内存大小
-Xmn：年轻代的内存大小，整个堆大小=年轻代 + 老年代，官方建议大小为堆空间的1/3，年轻代中又细分为伊甸区、幸存1区、幸存2区，其比例默认为8:1:1。
-XX: NewRatio=N：表示老年代与年轻代的内存比例，默认为2，即2:1，相当于年轻代占堆内存空间的1/3，老年代占2/3
-XX: PretenureSizeThreshold：大对象阈值，单位为字节Byte（1M=1024KB, 1KB=1024Byte），如果对象超过这个值，就会直接进入
```

1.5、线上问题定位
```shell
top # 查看占用最高的进制ID

top -Hp 进程id # 查看进程中占用最高的线程
```
:::


