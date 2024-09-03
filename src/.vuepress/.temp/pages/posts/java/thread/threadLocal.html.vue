<template><div><h2 id="threadlocal" tabindex="-1"><a class="header-anchor" href="#threadlocal" aria-hidden="true">#</a> ThreadLocal</h2>
<h3 id="_1、threadlocal和局部变量有什么区别" tabindex="-1"><a class="header-anchor" href="#_1、threadlocal和局部变量有什么区别" aria-hidden="true">#</a> 1、ThreadLocal和局部变量有什么区别？</h3>
<pre><code>相比于局部变量。ThreadLocal的优点就是可以在任意地方获取一些专属于当前线程的数据。
局部变量只能通过显示传参的方式让参数到达某一个方法。而ThreadLocal可以直接设置为一个静态变量，各个线程共享。这样可以实现隐式传输参数
</code></pre>
<h3 id="_2、threadlocal-使用场景" tabindex="-1"><a class="header-anchor" href="#_2、threadlocal-使用场景" aria-hidden="true">#</a> 2、ThreadLocal 使用场景</h3>
<ul>
<li>上下文环境 userContext(spring requestContextHolder中就使用了ThreadLocal</li>
<li>参数传递，隐式</li>
<li>数据库连接，Session会话管理</li>
</ul>
<h3 id="_3、threadlocal的内存泄露问题" tabindex="-1"><a class="header-anchor" href="#_3、threadlocal的内存泄露问题" aria-hidden="true">#</a> 3、ThreadLocal的内存泄露问题</h3>
<p>ThreadLocal在没有外部强引用时，发生GC时会被回收，如果创建ThreadLocal的线程一直持续运行，那么这个Entry对象中的value就有可能一直得不到回收，发生内存泄露。<br>
就比如线程池里面的线程，线程都是复用的，那么之前的线程实例处理完之后，出于复用的目的线程依然存活，所以，ThreadLocal设定的value值被持有，导致内存泄露。<br>
虽然ThreadLocalMap中的key是弱引用，当不存在外部强引用的时候，就会自动被回收，但是Entry中的value依然是强引用。这个value的引用链条如下：</p>
<p>可以看到，只有当Thread被回收时，这个value才有被回收的机会，否则，只要线程不退出，value总是会存在一个强引用。但是，要求每个Thread都会退出，是一个极其苛刻的要求，对于线程池来说，大部分线程会一直存在在系统的整个生命周期内，那样的话，就会造成value对象出现泄漏的可能。<br>
以getEntry()为例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Entry</span> <span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> key<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>table<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Entry</span> e <span class="token operator">=</span> table<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> key<span class="token punctuation">)</span>
        <span class="token comment">//如果找到key，直接返回</span>
        <span class="token keyword">return</span> e<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token comment">//如果找不到，就会尝试清理，如果你总是访问存在的key，那么这个清理永远不会进来</span>
        <span class="token keyword">return</span> <span class="token function">getEntryAfterMiss</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> i<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>getEntryAfterMiss()的实现：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Entry</span> <span class="token function">getEntryAfterMiss</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token class-name">Entry</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
    <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 整个e是entry ，也就是一个弱引用</span>
        <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//如果找到了，就返回</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> key<span class="token punctuation">)</span>
            <span class="token keyword">return</span> e<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token comment">//如果key为null，说明弱引用已经被回收了</span>
            <span class="token comment">//那么就要在这里回收里面的value了</span>
            <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token comment">//如果key不是要找的那个，那说明有hash冲突，这里是处理冲突，找下一个entry</span>
            i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

真正用来回收value的是<span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法，在<span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>和<span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法中，都会直接或者间接调用到这个方法进行value的清理：
从这里可以看到，<span class="token class-name">ThreadLocal</span>为了避免内存泄露，也算是花了一番大心思。不仅使用了弱引用维护key，还会在每个操作上检查key是否被回收，进而再回收
value。但是从中也可以看到，<span class="token class-name">ThreadLocal</span>并不能<span class="token number">100</span><span class="token operator">%</span>保证不发生内存泄漏。
比如，你的<span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法总是访问固定几个一直存在的<span class="token class-name">ThreadLocal</span>，那么清理动作就不会执行，如果你没有机会调用<span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>和<span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，那么这个内存泄漏依然会发
生。因此，要养成一个好习惯：当你不需要这个<span class="token class-name">ThreadLocal</span>变量时，主动调用<span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>，这样对整个系统是有好处的

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、解决冲突" tabindex="-1"><a class="header-anchor" href="#_4、解决冲突" aria-hidden="true">#</a> 4、解决冲突</h3>
<p>ThreadLocalMap中的Hash冲突处理<br>
ThreadLocalMap作为一个HashMap和java.util.HashMap的实现是不同的。对于java.util.HashMap使用的是链表法来处理冲突：</p>
<p>但是，对于ThreadLocalMap，它使用的是简单的线性探测法，如果发生了元素冲突，那么就使用下一个槽位存放。</p>
</div></template>


