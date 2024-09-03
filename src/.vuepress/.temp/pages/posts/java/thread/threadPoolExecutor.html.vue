<template><div><h2 id="线程池" tabindex="-1"><a class="header-anchor" href="#线程池" aria-hidden="true">#</a> 线程池</h2>
<h3 id="_1、创建线程池-创建线程池有必填的几个参数" tabindex="-1"><a class="header-anchor" href="#_1、创建线程池-创建线程池有必填的几个参数" aria-hidden="true">#</a> 1、创建线程池，创建线程池有必填的几个参数</h3>
<pre><code>核心线程数，最大线程数，存活时间，单位，阻塞队列
线程池执行线程的大概过程如下：
1、创建线程池，但是未创建线程，核心线程和非核心线程都是懒加载
2、当核心线程数满了之后，任务会进入到阻塞队列中等待被执行
3、当阻塞队列满了之后，会创建非核心线程执行任务。
</code></pre>
<p>验证过程如下：</p>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/threadPoolCreateDemo.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>github源码地址：<a href="https://github.com/chenweiquan-red/cwq-public-knowledge" target="_blank" rel="noopener noreferrer">https://github.com/chenweiquan-red/cwq-public-knowledge<ExternalLinkIcon/></a></p>
<p>疑问点：</p>
<ul>
<li>1、当核心线程数满，阻塞队列满之后，创建的非核心线程执行任务。那么当阻塞队列的任务会被那个线程消费？后续的任务是否会直接被执行还是存放在阻塞队列中？</li>
<li>2、阻塞队列一般使用LinkedBlockingQueue？还是怎么优化？</li>
</ul>
<h3 id="_2、手动实现阻塞队列功能" tabindex="-1"><a class="header-anchor" href="#_2、手动实现阻塞队列功能" aria-hidden="true">#</a> 2、手动实现阻塞队列功能</h3>
<p>待完成...</p>
<h3 id="_3、手动实现线程池功能" tabindex="-1"><a class="header-anchor" href="#_3、手动实现线程池功能" aria-hidden="true">#</a> 3、手动实现线程池功能</h3>
<p>待完成...</p>
</div></template>


