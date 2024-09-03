<template><div><h1 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h1>
<h3 id="工厂模式一般有三种角色-抽象产品-具体产品-工厂" tabindex="-1"><a class="header-anchor" href="#工厂模式一般有三种角色-抽象产品-具体产品-工厂" aria-hidden="true">#</a> 工厂模式一般有三种角色，抽象产品，具体产品，工厂</h3>
<Tabs id="6" :data='[{"id":"简单工厂"},{"id":"工厂方法"},{"id":"抽象工厂"}]' :active="0">
<template #title0="{ value, isActive }">简单工厂</template>
<template #title1="{ value, isActive }">工厂方法</template>
<template #title2="{ value, isActive }">抽象工厂</template>
<template #tab0="{ value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 伪代码</span>
<span class="token doc-comment comment">/**
 * 定义抽象产品-车
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 定义具体产品--比亚迪
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BYDCar</span> <span class="token keyword">implements</span> <span class="token class-name">Car</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 定义工厂
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CarFactory</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 生产汽车
     *
     * <span class="token keyword">@return</span> Car
     */</span>
    <span class="token class-name">Car</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"BYD"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BYDCar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 工厂方法是指多了具体产品的工厂，每个工厂有个抽象的工厂接口，定义生产接口</span>

<span class="token doc-comment comment">/**
 * 定义抽象产品-车
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 定义具体产品--比亚迪
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BYDCar</span> <span class="token keyword">implements</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 抽象工厂
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CarFactory</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 生产汽车
     *
     * <span class="token keyword">@return</span> Car
     */</span>
    <span class="token class-name">Car</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * BYD汽车工厂
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BYDCarFactory</span> <span class="token keyword">implements</span> <span class="token class-name">CarFactory</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@java.lang.Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Car</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BYDCar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 抽象工厂主要是工厂有了更多的功能，不单单只生产汽车，还会生产汽车用品</span>

<span class="token doc-comment comment">/**
 * 抽象工厂
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CarFactory</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 生产汽车
     *
     * <span class="token keyword">@return</span> Car
     */</span>
    <span class="token class-name">Car</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 生产轮胎
     *
     * <span class="token keyword">@return</span> O
     */</span>
    <span class="token class-name">Object</span> <span class="token function">createLT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * BYD汽车工厂
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BYDCarFactory</span> <span class="token keyword">implements</span> <span class="token class-name">CarFactory</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@java.lang.Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Car</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BYDCar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@java.lang.Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">createLT</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"生产轮胎"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
</div></template>


