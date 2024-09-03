<template><div><h1 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h1>
<h3 id="_1、责任链模式" tabindex="-1"><a class="header-anchor" href="#_1、责任链模式" aria-hidden="true">#</a> 1、责任链模式</h3>
<h4 id="_1-1、首先定义抽象接口类" tabindex="-1"><a class="header-anchor" href="#_1-1、首先定义抽象接口类" aria-hidden="true">#</a> 1.1、首先定义抽象接口类</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 责任链定义的抽象接口类
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
 * 1、定义子类执行入口
 * 2、定义下一个处理器的入口
 *
 * <span class="token keyword">@description</span>: AbstractChainHandler
 * <span class="token keyword">@author</span>: WeiQ.chen
 * <span class="token keyword">@date</span>: 2023/2/3
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractChainHandler</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 下一个处理器
     */</span>
    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token class-name">AbstractChainHandler</span> nextHandler<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 执行器入口
     *
     * <span class="token keyword">@param</span> <span class="token parameter">param</span> 参数
     */</span>
    <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">String</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 定义下一个处理器的入口
     *
     * <span class="token keyword">@param</span> <span class="token parameter">param</span> /
     */</span>
    <span class="token keyword">void</span> <span class="token function">nextExecute</span><span class="token punctuation">(</span><span class="token class-name">String</span> param<span class="token punctuation">,</span> <span class="token class-name">HandlerResult</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"上一个过滤的执行结果！{}"</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">nonNull</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>nextHandler<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>nextHandler<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2、定义实际责任链中的每个处理类" tabindex="-1"><a class="header-anchor" href="#_1-2、定义实际责任链中的每个处理类" aria-hidden="true">#</a> 1.2、定义实际责任链中的每个处理类</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * 责任链中处理器A
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
 * ps: 应该还需要考虑顺序，分组，并发，禁用
 *
 * <span class="token keyword">@description</span>: 处理器A
 * <span class="token keyword">@author</span>: WeiQ.chen
 * <span class="token keyword">@date</span>: 2023/2/3
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Handler</span><span class="token punctuation">(</span>order <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AHandler</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractChainHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">String</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"A 处理中..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">nextExecute</span><span class="token punctuation">(</span>param<span class="token punctuation">,</span> <span class="token class-name">HandlerResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: B处理器
 * <span class="token keyword">@author</span>: WeiQ.chen
 * <span class="token keyword">@date</span>: 2023/2/3
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Handler</span><span class="token punctuation">(</span>order <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BHandler</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractChainHandler</span><span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">String</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"B 处理中..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">nextExecute</span><span class="token punctuation">(</span>param<span class="token punctuation">,</span> <span class="token class-name">HandlerResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"B 处理失败"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3、统一处理器入口-逻辑处理类" tabindex="-1"><a class="header-anchor" href="#_1-3、统一处理器入口-逻辑处理类" aria-hidden="true">#</a> 1.3、统一处理器入口，逻辑处理类</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * 责任链处理器
 * 统一管理每个处理器，包括加载，存储，排序，处理器入口等
 *
 * <span class="token keyword">@author</span>: WeiQ.chen
 * <span class="token keyword">@date</span>: 2023/2/3
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChainHandler</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 责任链
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AbstractChainHandler</span><span class="token punctuation">></span></span> chain<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 当前处理器
     */</span>
    <span class="token class-name">AbstractChainHandler</span> currentHandler<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 初始化时获取需要加载的处理器
     */</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取AbstractChainHandler的子类，并且获取对应的顺序和禁用状态 注解</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">AbstractChainHandler</span><span class="token punctuation">></span></span> handlerClass <span class="token operator">=</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBeansOfType</span><span class="token punctuation">(</span><span class="token class-name">AbstractChainHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">MapUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>handlerClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"not found AbstractChainHandler"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        chain <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 过滤 &amp; 排序</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AbstractChainHandler</span><span class="token punctuation">></span></span> temp <span class="token operator">=</span> handlerClass<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>v <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token class-name">Handler</span> handler <span class="token operator">=</span> v<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">Handler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token operator">!</span>handler<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> aC <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">Handler</span> handlerA <span class="token operator">=</span> aC<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">Handler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> bC <span class="token operator">=</span> b<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">Handler</span> handlerB <span class="token operator">=</span> bC<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">Handler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token keyword">return</span> handlerA<span class="token punctuation">.</span><span class="token function">order</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> handlerB<span class="token punctuation">.</span><span class="token function">order</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 添加到责任链中</span>
        chain<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>chain<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"not found AbstractChainHandler"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        currentHandler <span class="token operator">=</span> chain<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        chain<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">AbstractChainHandler</span> head <span class="token operator">=</span> currentHandler<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">AbstractChainHandler</span> next <span class="token operator">:</span> chain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           currentHandler<span class="token punctuation">.</span><span class="token function">setNextHandler</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
           currentHandler <span class="token operator">=</span> currentHandler<span class="token punctuation">.</span><span class="token function">getNextHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        currentHandler <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 开始执行
     *
     * <span class="token keyword">@param</span> <span class="token parameter">param</span> /
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token class-name">Start</span><span class="token punctuation">(</span><span class="token class-name">String</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">notNull</span><span class="token punctuation">(</span>currentHandler<span class="token punctuation">,</span> <span class="token string">"IllegalArgumentException not found order chain handler"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        currentHandler<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4、责任链中的工具类-比如-节点中的结果的传递-注解定义顺序或者启用禁用属性" tabindex="-1"><a class="header-anchor" href="#_1-4、责任链中的工具类-比如-节点中的结果的传递-注解定义顺序或者启用禁用属性" aria-hidden="true">#</a> 1.4、责任链中的工具类，比如：节点中的结果的传递，注解定义顺序或者启用禁用属性</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 处理器属性定义
 *
 * <span class="token keyword">@author</span>: WeiQ.chen
 * <span class="token keyword">@date</span>: 2023/2/3
 */</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Handler</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 顺序
     *
     * <span class="token keyword">@return</span> /
     */</span>
    <span class="token keyword">int</span> <span class="token function">order</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 是否启用禁用
     *
     * <span class="token keyword">@return</span> /
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>



<span class="token doc-comment comment">/**
 * 处理结果类
 *
 * <span class="token keyword">@author</span>: WeiQ.chen
 * <span class="token keyword">@date</span>: 2023/2/3
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HandlerResult</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> msg<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HandlerResult</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HandlerResult</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HandlerResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">setMsg</span><span class="token punctuation">(</span><span class="token string">"ok"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HandlerResult</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HandlerResult</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HandlerResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">setMsg</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


