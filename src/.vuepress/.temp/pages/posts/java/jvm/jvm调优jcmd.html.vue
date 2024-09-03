<template><div><h3 id="_1、jvm调优-性能分析命令" tabindex="-1"><a class="header-anchor" href="#_1、jvm调优-性能分析命令" aria-hidden="true">#</a> 1、JVM调优，性能分析命令</h3>
<h4 id="_1、jcmd指令的命令格式为-jcmd-pid-options" tabindex="-1"><a class="header-anchor" href="#_1、jcmd指令的命令格式为-jcmd-pid-options" aria-hidden="true">#</a> 1、jcmd指令的命令格式为： jcmd pid [ options ]</h4>
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
</div></template>


