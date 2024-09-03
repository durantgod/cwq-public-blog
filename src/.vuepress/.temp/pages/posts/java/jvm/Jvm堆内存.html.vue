<template><div><Tabs id="0" :data='[{"id":"Jvm堆内存"},{"id":"JVM内存分布（1.8） a"},{"id":"jcmd"},{"id":"jinfo"},{"id":"jmap"},{"id":"jstack"},{"id":"jstat"}]' :active="1">
<template #title0="{ value, isActive }">Jvm堆内存</template>
<template #title1="{ value, isActive }">JVM内存分布（1.8） a</template>
<template #title2="{ value, isActive }">jcmd</template>
<template #title3="{ value, isActive }">jinfo</template>
<template #title4="{ value, isActive }">jmap</template>
<template #title5="{ value, isActive }">jstack</template>
<template #title6="{ value, isActive }">jstat</template>
<template #tab0="{ value, isActive }">
<h1 id="_1、jvm堆内存" tabindex="-1"><a class="header-anchor" href="#_1、jvm堆内存" aria-hidden="true">#</a> 1、Jvm堆内存</h1>
<h3 id="_1-1、内存参数设置" tabindex="-1"><a class="header-anchor" href="#_1-1、内存参数设置" aria-hidden="true">#</a> 1.1、内存参数设置</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>jvm 内存主要是堆内存，存储对象。堆内存主要由新生代和老年代组成。
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/jvmesso.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-2、对象分配内存流程" tabindex="-1"><a class="header-anchor" href="#_1-2、对象分配内存流程" aria-hidden="true">#</a> 1.2、对象分配内存流程</h3>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/jvm流程图.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h1 id="_2、jvm常用命令" tabindex="-1"><a class="header-anchor" href="#_2、jvm常用命令" aria-hidden="true">#</a> 2、Jvm常用命令</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">1</span>、jps 查看进程
<span class="token number">2</span>、jstat
 jstat <span class="token parameter variable">-gc</span> <span class="token number">15744</span> <span class="token comment">## 查看GC信息，Jvm内存占用情况</span>

<span class="token number">3</span>、jmap
 <span class="token comment">## 打印的信息分别为：共享对象的起始地址、映射大小、共享对象路径的全程。</span>
 jmap <span class="token number">15744</span> <span class="token comment">## 主要用于打印指定java进程的共享对象内存映射或堆内存细节 </span>
 
 jmap <span class="token parameter variable">-heap</span> pid  <span class="token comment">## 查看堆使用情况</span>
 map <span class="token parameter variable">-histo</span> pid  <span class="token comment">## 查看堆中对象数量和大小</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p></p>
</template>
<template #tab1="{ value, isActive }">
<p>1、内存模型</p>
<pre><code>程序计数器：保存当前线程执行的字节码位置
堆：存放对象的实例，没有空间，会抛出OOM异常
栈、虚拟机栈：存放局部变量，动态链接，操作栈，方法出口等信息，调用方法都会创建栈
本地方法栈：和虚拟机栈基本相同，但是本地是指native方法

以下两个不在JVM虚拟机中

方法区：又称非堆区，存储类信息，常量，静态变量等数
本地内存：分为元空间和直接内存
元空间：1.7的永久代和1.8的元空间，是方法区的一种实现
</code></pre>
<p><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/jvm2.jpg" alt="" loading="lazy"><br>
2、GC</p>
<pre><code>分代回收：年轻代，老年代，持久代
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
</code></pre>
<p>3、类加载</p>
<pre><code>■ 双亲委派机制（自底向上检查是否已被加载，自上向下加载类）
■ Bootstrap类加载器 \lib目录下的类
■ Extension类加载器 \lib\ext下的类
■ AppLication类加载器  扫描包下的类
■ 自定义类加载器（不打破双亲委派重写findClass，无法被父类加载的都会在这里加载，打破双亲就重写findClass）
■ 类加载的过程：加载loading -- 链接Linking :（验证 - 准备 - 解析） -- 初始化
</code></pre>
<p>4、性能调优</p>
<pre><code>jvm参数：看2
性能分析工具：MAT,JMC,jstack,Jstat
</code></pre>
<p>5、编译器优化</p>
<pre><code>公共子表达式的消除
指令重排
内联
逃逸分析
栈上分配
同步消除
</code></pre>
<p>6、执行模式</p>
<pre><code>解释模式
编译模式
混合模式
</code></pre>
<p>常见问题：</p>
<pre><code>1、什么是指针碰撞？ 堆内存中分配内存时指针挪动分配的方式。
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
</code></pre>
<p></p>
</template>
<template #tab2="{ value, isActive }">
<p>1.1、 在JDK1.7以后，新增了一个命令行工具jcmd。它是一个多功能的工具，可以用来实现前面除了jstat之外所有命令的功能，比如用它来导出堆、内存使用、查看Java进程、导出线程信息、执行GC、JVM运行时间等。jcmd拥有jmap的大部分功能，并且官方也推荐使用jcmd命令代替jmap命令。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> jcmd <span class="token number">15008</span>  <span class="token builtin class-name">help</span> <span class="token comment"># 查看jcmd支持的相关操作，如下图1</span>
 
 jcmd <span class="token number">15008</span> VM.uptime <span class="token comment"># 查看jvm启动时间</span>
 
 jcmd <span class="token number">15008</span> Thread.print <span class="token comment"># 打印线程堆栈信息</span>
 
 jcmd <span class="token number">15008</span> GC.class_histogram <span class="token comment"># 查看系统中类的统计信息</span>
 
 jcmd <span class="token number">15008</span> GC.heap_dump D:<span class="token punctuation">\</span>d.hprof <span class="token comment"># 和jmap dump 功能差不多，也会进行一次FGC？</span>
 
 jcmd <span class="token number">15008</span> VM.flags <span class="token comment"># 获取启动参数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jcmdhelp.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2、jstatd-远程主机信息收集" tabindex="-1"><a class="header-anchor" href="#_2、jstatd-远程主机信息收集" aria-hidden="true">#</a> 2、jstatd：远程主机信息收集</h4>
<p>之前的指令只涉及监控本机的Java应用程序，而在这些工具中，<br>
一些监控工具也支持对远程计算机的监控（如jps、jstat）。<br>
为了启用远程监控，则需要配合使用jstatd工具。命令jstatd是一个RMI服务端程序，<br>
它的作用相当于代理服务器，建立本地计算机与远程监控工具的通信。jstatd服务器将本机的<br>
Java应用程序信息传递到远程计算机。执行原理如图21-34所示。图21-34　jstatd执行原理图<br>
直接打开jstatd服务器可能会抛出访问拒绝异常，这是因为jstatd程序没有足够的权限，</p>
<p>参考：<a href="https://www.cnblogs.com/duanxz/archive/2012/10/25/2738831.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/duanxz/archive/2012/10/25/2738831.html<ExternalLinkIcon/></a></p>
<p></p>
</template>
<template #tab3="{ value, isActive }">
<p>1、jinfo指令的命令格式为： jinfo  [ options ] pid</p>
<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>no option</td>
<td>输出所有的参数和系统属性，包括默认值</td>
</tr>
<tr>
<td>-flag name</td>
<td>输出对应名称的参数</td>
</tr>
<tr>
<td>-flag [+-]name</td>
<td>开启或者关闭对应参数名称的参数，只有标记为manageable 的参数才可以被动态修改</td>
</tr>
<tr>
<td>-flag name=value</td>
<td>修改对应参数的值</td>
</tr>
<tr>
<td>-flags</td>
<td>输出全部的参数</td>
</tr>
<tr>
<td>-sysprops</td>
<td>输出系统属性，system.getProperties()</td>
</tr>
</tbody>
</table>
<p>1.1、 jinfo</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> jinfo <span class="token parameter variable">-flags</span> <span class="token number">24916</span> <span class="token comment"># 输出参数</span>

 <span class="token comment">#查看JVM是否使用了ParallelGC垃圾收集器</span>
 jinfo –flag UseParallelGC <span class="token number">15008</span>
 
  <span class="token comment">#新生代对象晋升到老年代对象的最大年龄</span>
 jinfo <span class="token parameter variable">-flag</span> MaxTenuringThreshold <span class="token number">15008</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfo.png" alt="" loading="lazy"><br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfoflags.png" alt="" loading="lazy"></p>
<p></p>
</template>
<template #tab4="{ value, isActive }">
<p>1、jmap指令的命令格式为：jmap [options] pid</p>
<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-heap</td>
<td>查看进程堆内存使用情况，包括使用的GC算法、堆配置参数和各代中堆内存使用情况</td>
</tr>
<tr>
<td>-histo</td>
<td>查看堆内存中的对象数目、大小统计直方图，如果带上live则只统计活对象并且会强制执行一次GC</td>
</tr>
<tr>
<td>-dump</td>
<td>用jmap把进程内存使用情况dump到文件中，再用jhat分析查看，通常在写dump文件前会触发一次Full GC，所以dump文件里保存的都是Full GC后留下的对象信息</td>
</tr>
<tr>
<td>-dump:live</td>
<td>保存堆中存活对象</td>
</tr>
<tr>
<td>-clstats</td>
<td>显示Java堆中元空间的类加载器的统计信息</td>
</tr>
<tr>
<td>-finalizerinfo</td>
<td>显示在F-Queue中等待Finalizer线程执行finalize方法的对象</td>
</tr>
<tr>
<td>-F</td>
<td>当dump命令不响应的时候，可以强行dump</td>
</tr>
</tbody>
</table>
<p>1.1、 jmap</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jmap <span class="token number">22492</span>  <span class="token comment"># 显示Java虚拟机进程的内存映像信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmap.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>1.2、jmap -heap</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jmap <span class="token parameter variable">-heap</span> <span class="token number">22492</span> <span class="token comment"># 指定的垃圾回收算法的信息, 堆的配置信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmap1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>解读：可以看到JVM版本，并行垃圾回收器，以及堆内存配置，最大80M，NewRatio比例2，SurvivorRatio比例8。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>1.3、 jmap -histo[:live]</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jmap <span class="token parameter variable">-histo</span> <span class="token number">22492</span> <span class="token comment"># 显示Java堆中对象的统计信息，包括：对象数量、占用内存大小(单位：字节)和类的完全限定名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmaphisto.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jmap <span class="token parameter variable">-histo:live</span> <span class="token number">22492</span> <span class="token comment"># 显示存活对象，并且会执行一次GC，FGC？</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmaphistolive.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>1.4、jmap -dump</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
<span class="token comment"># 手动模式</span>
     <span class="token comment">#手动获取堆内存全部信息</span>
     jmap <span class="token parameter variable">-dump:format</span><span class="token operator">=</span>b,file<span class="token operator">=</span>D:/dump.hprof <span class="token number">22492</span>
     jmap -dump:live,format<span class="token operator">=</span>b,file<span class="token operator">=</span><span class="token operator">&lt;</span>filename.hprof<span class="token operator">></span><span class="token operator">&lt;</span>pid<span class="token operator">></span>
     
<span class="token comment"># 主动模式（当OOM时dump当时的快照）</span>
    -XX:+HeapDumpOnOutOfMemoryError：在堆溢出的时候可以储存快照
    <span class="token parameter variable">-XX:HeapDumpPath</span><span class="token operator">=</span>d:/dumps/：导出内存快照时保存的路径

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MAT工具下载：<a href="https://eclipse.dev/mat/previousReleases.php" target="_blank" rel="noopener noreferrer">https://eclipse.dev/mat/previousReleases.php<ExternalLinkIcon/></a><br>
jdk1.8下载1.11.0版本，新版本需要jdk11</p>
<p>mat具体使用：<a href="https://blog.csdn.net/qq_33204709/article/details/128029367" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq_33204709/article/details/128029367<ExternalLinkIcon/></a></p>
<p>具体：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/mat.png" alt="" loading="lazy"><br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/mat2.png" alt="" loading="lazy"></p>
<h3 id="_2-jhat-jdk自带堆分析工具" tabindex="-1"><a class="header-anchor" href="#_2-jhat-jdk自带堆分析工具" aria-hidden="true">#</a> 2 jhat:JDK自带堆分析工具</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>     jhat  <span class="token punctuation">[</span> options <span class="token punctuation">]</span> <span class="token punctuation">[</span> hostid <span class="token punctuation">]</span>

     jhat d:<span class="token punctuation">\</span>autoDump.hprof <span class="token comment"># 分析jmap dump 出来的文件，默认7000 端口</span>
     
     jhat <span class="token parameter variable">-port</span> <span class="token operator">&lt;</span>port_number<span class="token operator">></span> <span class="token operator">&lt;</span>heap_dump_file<span class="token operator">></span> <span class="token comment"># 可以加上自定义端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jhat.png" alt="" loading="lazy"><br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jhathistogram.png" alt="" loading="lazy"></p>
<p></p>
</template>
<template #tab5="{ value, isActive }">
<h4 id="_1、jstack指令的命令格式为-jstack-option-pid" tabindex="-1"><a class="header-anchor" href="#_1、jstack指令的命令格式为-jstack-option-pid" aria-hidden="true">#</a> 1、jstack指令的命令格式为：jstack [ option ] pid</h4>
<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-F</td>
<td>不影响当前请求情况下，强制输出线程堆栈</td>
</tr>
<tr>
<td>-l</td>
<td>除了堆栈外，显示关于锁的附加信息</td>
</tr>
<tr>
<td>-m</td>
<td>如果调用本地方法，可以显示C/C++的堆栈信息</td>
</tr>
<tr>
<td>-h</td>
<td>获取帮助</td>
</tr>
</tbody>
</table>
<p>1.1、 jstack</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jstack <span class="token number">24916</span>

jstack <span class="token number">62977</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"waiting"</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span> <span class="token comment"># 查询关键信息，或者子线程信息</span>

jstack <span class="token number">62977</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">'nid'</span> <span class="token parameter variable">-C5</span> <span class="token parameter variable">-color</span> <span class="token comment"># 颜色标注</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jstack.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p></p>
</template>
<template #tab6="{ value, isActive }">
<h3 id="_1、jvm调优-性能分析命令" tabindex="-1"><a class="header-anchor" href="#_1、jvm调优-性能分析命令" aria-hidden="true">#</a> 1、JVM调优，性能分析命令</h3>
<p>1、jstat指令的命令格式为：jstat [options] pid [interval] [count]</p>
<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-gc</td>
<td>统计垃圾回收的堆信息，单位为空间字节数，即单位为KB</td>
</tr>
<tr>
<td>-gcutil</td>
<td>统计垃圾回收的堆信息，单位为空间的百分比</td>
</tr>
<tr>
<td>-class</td>
<td>统计类加载器的信息</td>
</tr>
<tr>
<td>-compile</td>
<td>统计编译行为信息</td>
</tr>
<tr>
<td>-gccapacity</td>
<td>统计不同区域（新生代、老年代、永久代）的堆容量信息</td>
</tr>
<tr>
<td>-gccause</td>
<td>统计引起垃圾回收的事件</td>
</tr>
<tr>
<td>-gcnew</td>
<td>统计垃圾回收时，新生代的情况</td>
</tr>
<tr>
<td>-gcnewcapacity</td>
<td>统计垃圾回收时，新生代堆空间容量</td>
</tr>
<tr>
<td>-gcold</td>
<td>统计垃圾回收时，老年代的情况</td>
</tr>
<tr>
<td>-gcoldcapacity</td>
<td>统计垃圾回收时，老年代堆空间容量</td>
</tr>
<tr>
<td>-gcpermcapacity</td>
<td>统计垃圾回收时，永久代的堆空间容量</td>
</tr>
</tbody>
</table>
<p>1.1、 jstat -gc</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jstat <span class="token parameter variable">-gc</span> <span class="token number">61971</span> <span class="token number">1000</span> <span class="token number">10</span>  <span class="token comment"># 统计垃圾回收的堆信息 每秒打印进程1994gc信息，打印10次</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/jstat1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
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
<span class="token number">1</span>、S0C如果是空的，说明开启了指针压缩。实际上java1.8默认是开启了指针压缩
如果要关闭指针压缩可以使用：java <span class="token parameter variable">-XX:-UseCompressedOops</span> <span class="token parameter variable">-jar</span> your-application.jar
指针压缩相关blog: https://www.cnblogs.com/star95/p/17512212.html

<span class="token number">2</span>、S1C为：16284KB, EC区为：196608KB OC：147456KB
比例：S0C:S1C:EC <span class="token operator">=</span> <span class="token number">0</span>:1:12
S1C+EC <span class="token builtin class-name">:</span> OC <span class="token operator">=</span> <span class="token number">1.44</span> <span class="token punctuation">(</span>这个比例怎么这么奇怪？后续可以看看参数设置和默认值是多少<span class="token punctuation">)</span>
<span class="token punctuation">(</span>这个问题能从《剑指JVM》中7.8找到<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IDEA设置运行最大堆内存，最小堆内存为80M，再运行命令看看，截图如下：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gc80m.png" alt="" loading="lazy"></p>
<p>S0C+S1C+EC = 80m<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gcbl.png" alt="" loading="lazy"></p>
<p>1.2、jstat -gcutil</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jstat <span class="token parameter variable">-gcutil</span> <span class="token number">22492</span> <span class="token number">1000</span> <span class="token comment"># 统计垃圾回收的堆信息，单位为空间的百分比</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>模拟产生OOM的过程，需要Jmeter 和 设置IDEA 分配的内存。</p>
<p>Jmeter安装教程：<a href="https://www.cnblogs.com/luoshuai7394/p/17932334.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/luoshuai7394/p/17932334.html<ExternalLinkIcon/></a></p>
<p>设置截图：右键新增线程组，新增tcp取样器，新增监听器查看结果树<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jmetertcp.png" alt="" loading="lazy"></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>S0：幸存1区当前使用比例
S1：幸存2区当前使用比例
E：伊甸园区使用比例
O：老年代使用比例
M：元数据区使用比例
CCS：压缩类使用比例
YGC：年轻代垃圾回收次数
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过压测可以看到老年代使用比例达到了99%，100%。从而发生了OOM。</p>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gcutil1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>1.3、 jstat -gccause</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jstat <span class="token parameter variable">-gccause</span> <span class="token number">22492</span> <span class="token number">1000</span> <span class="token comment"># 统计引起垃圾回收的事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/Pictures/gccause.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>S0：幸存1区当前使用比例
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1.4、 常用参数</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>-Xms：程序启动时占用的内存大小，此值可以和-Xmx相同，避免每次垃圾回收后重新分配内存
-Xmx：程序运行时的最大可占用的内存大小
-Xmn：年轻代的内存大小，整个堆大小=年轻代 + 老年代，官方建议大小为堆空间的1/3，年轻代中又细分为伊甸区、幸存1区、幸存2区，其比例默认为8:1:1。
-XX: NewRatio=N：表示老年代与年轻代的内存比例，默认为2，即2:1，相当于年轻代占堆内存空间的1/3，老年代占2/3
-XX: PretenureSizeThreshold：大对象阈值，单位为字节Byte（1M=1024KB, 1KB=1024Byte），如果对象超过这个值，就会直接进入
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1.5、线上问题定位</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">top</span> <span class="token comment"># 查看占用最高的进制ID</span>

<span class="token function">top</span> <span class="token parameter variable">-Hp</span> 进程id <span class="token comment"># 查看进程中占用最高的线程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
</div></template>


