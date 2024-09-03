<template><div><h1 id="限流方案" tabindex="-1"><a class="header-anchor" href="#限流方案" aria-hidden="true">#</a> 限流方案</h1>
<h3 id="_1、限流方案-主要是token-bucket-令牌桶-和-leaky-bucket-漏桶" tabindex="-1"><a class="header-anchor" href="#_1、限流方案-主要是token-bucket-令牌桶-和-leaky-bucket-漏桶" aria-hidden="true">#</a> 1、限流方案，主要是Token Bucket （令牌桶）和 Leaky Bucket（漏桶）</h3>
<h4 id="具体对比" tabindex="-1"><a class="header-anchor" href="#具体对比" aria-hidden="true">#</a> 具体对比</h4>
<Tabs id="9" :data='[{"id":"Token Bucket"},{"id":"Leaky Bucket"}]' :active="0">
<template #title0="{ value, isActive }">Token Bucket</template>
<template #title1="{ value, isActive }">Leaky Bucket</template>
<template #tab0="{ value, isActive }">
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/tokenBlucket.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>其他比较详细的blog: <a href="https://blog.csdn.net/qq1805696978/article/details/97783011" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq1805696978/article/details/97783011<ExternalLinkIcon/></a></p>
<p>详细类图：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/reatelimiterclass.png" alt="" loading="lazy"></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    常用接口：
    1、create(n) n:表示每秒产生N个令牌，控制速率
    2、acquire(/n) 表示阻塞获取令牌，n:一次获取多个，不传为1
    3、tryAcquire(/n, time, unit) 表示尝试获取令牌，可选等待
     


    遇到的难题：
    1、生产令牌速率，如果是小数或者无限小数，精度会丢失比较严重。
    
    
    
    
    
    2、第一次获取令牌时间不耗时，而且次数第一次不算?
    ：因为第一次获取是通过对比上次时间差计算令牌的数量，第一次获取是没有时间差，所以会里面返回一个令牌，
    并且计算出下一个令牌产生的时间。下一次获取令牌就需要到一定的时间。所以往往会比实际多一个令牌。
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RateLimiter 并不是真的按照时间生成令牌，而是通过计算时间差计算令牌的数量。<br>
核心计算方法：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/ratelimiter.png" alt="" loading="lazy"></p>
<p>测试代码：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TokenBucket</span> <span class="token punctuation">{</span>
    <span class="token class-name">RateLimiter</span> rateLimiter <span class="token operator">=</span> <span class="token class-name">RateLimiter</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">/</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">order</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> acquire <span class="token operator">=</span> rateLimiter<span class="token punctuation">.</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>acquire<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">"失败！"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"获取成功!"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">order2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">double</span> acquire <span class="token operator">=</span> rateLimiter<span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"获取成功!, 耗时："</span> <span class="token operator">+</span> acquire<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">TokenBucket</span> tokenBucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TokenBucket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">6000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">11</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//Thread.sleep(62);</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>tokenBucket<span class="token punctuation">.</span><span class="token function">order2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"， 总耗时："</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/leckBluct.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>待补充...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</Tabs>
</div></template>


