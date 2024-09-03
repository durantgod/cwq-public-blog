<template><div><h3 id="_1、jvm调优-性能分析命令" tabindex="-1"><a class="header-anchor" href="#_1、jvm调优-性能分析命令" aria-hidden="true">#</a> 1、JVM调优，性能分析命令</h3>
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
</div></template>


