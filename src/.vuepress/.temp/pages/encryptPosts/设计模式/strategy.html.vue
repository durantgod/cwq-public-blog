<template><div><h1 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h1>
<h4 id="_1、策略模式" tabindex="-1"><a class="header-anchor" href="#_1、策略模式" aria-hidden="true">#</a> 1、策略模式</h4>
<p>主要的角色有：工厂类，策略工厂，策略注解，具体策略实现类。<p/><br>
使用流程是：具体策略类先加载到策略工厂，使用的时候再从策略工厂根据对应的标识获取实际的执行类就好了</p>
<p>1、工厂类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: WQFactory 全局工厂 接口定义
 * <span class="token keyword">@author</span>: Weichuan.chen
 * <span class="token keyword">@date</span>: 2021/11/22
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">WQFactory</span> <span class="token punctuation">{</span>
    <span class="token comment">// 没有接口实现，主要为所有 WQ 自定义工厂提供一个入口</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、单例工厂策略类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: WQStrategyFactory 策略工厂类，单例模式，用于注册/生成相对应的策略实现类
 * <span class="token keyword">@author</span>: Weichuan.chen
 * <span class="token keyword">@date</span>: 2021/11/22
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WQStrategyFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">WQStrategyContext</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">WQFactory</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 实例
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">WQStrategyFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 策略集合
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span></span> strategy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">WQStrategyFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">WQStrategyFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WQStrategyFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token class-name">WQStrategyFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WQStrategyFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据策略标识获取相应的处理逻辑，如：根据设备关系策略名和对应的策略flag获取实现类
     *
     * <span class="token keyword">@param</span> <span class="token parameter">flag</span> com.space.iot.device.enums.DeviceRelationEnum
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">WQStrategyKeyEnum</span></span><span class="token punctuation">}</span>
     * <span class="token keyword">@return</span> 返回实现类
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> flag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> strategy<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>flag<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * 注册策略，把相应的策略注册上来，在工厂中统一生成
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">></span></span> sonStrategy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>strategy<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> sonStrategy<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、策略注解</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: WQStatisticsScope 策略注解，scope是场景，key是指具体不同策略
 * <span class="token keyword">@author</span>: Weichuan.chen
 * <span class="token keyword">@date</span>: 2021/11/22
 */</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">WQStatisticsScope</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 使用场景
     *
     * <span class="token keyword">@return</span> str
     */</span>
    <span class="token class-name">WQStrategyKeyEnum</span> <span class="token function">scope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 具体策略
     *
     * <span class="token keyword">@return</span> str
     */</span>
    <span class="token class-name">String</span> <span class="token function">strategyKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、策略参数父类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: WQStrategyContext 策略工厂参数父类
 * <span class="token keyword">@author</span>: Weichuan.chen
 * <span class="token keyword">@date</span>: 2021/11/22
 */</span>
<span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">WQStrategyContext</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、策略枚举类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>: WQStrategyKeyEnum 每个应用域的策略名称
 * <span class="token keyword">@author</span>: Weichuan.chen
 * <span class="token keyword">@date</span>: 2021/11/22
 */</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">WQStrategyKeyEnum</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 场景1 ex:设备联动
     **/</span>
    <span class="token function">DEVICE</span><span class="token punctuation">(</span><span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 场景2 ex:消息通知
     */</span>
    <span class="token function">MSG</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Getter</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">;</span>

    <span class="token class-name">WQStrategyKeyEnum</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6、大概使用流程</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * 策略工厂的实现
 *
 * <span class="token keyword">@author</span> WQ
 * <span class="token keyword">@date</span> 2023/12/8/008
 * <span class="token keyword">@since</span> 1.0.0
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StrategyDemo</span> <span class="token punctuation">{</span>
    <span class="token class-name">WQStrategyFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">WQStrategyContext</span><span class="token punctuation">></span></span> factory <span class="token operator">=</span> <span class="token class-name">WQStrategyFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">WQStrategyContext</span> sim <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">WQStrategyKeyEnum</span><span class="token punctuation">.</span><span class="token constant">DEVICE</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        sim<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@WQStatisticsScope</span><span class="token punctuation">(</span>scope <span class="token operator">=</span> <span class="token class-name">WQStrategyKeyEnum</span><span class="token punctuation">.</span><span class="token constant">MSG</span><span class="token punctuation">,</span> strategyKey <span class="token operator">=</span> <span class="token string">"1"</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Sim</span> <span class="token keyword">extends</span> <span class="token class-name">WQStrategyContext</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 短信推送</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@WQStatisticsScope</span><span class="token punctuation">(</span>scope <span class="token operator">=</span> <span class="token class-name">WQStrategyKeyEnum</span><span class="token punctuation">.</span><span class="token constant">MSG</span><span class="token punctuation">,</span> strategyKey <span class="token operator">=</span> <span class="token string">"2"</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Sim2</span> <span class="token keyword">extends</span> <span class="token class-name">WQStrategyContext</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 邮件推送</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@WQStatisticsScope</span><span class="token punctuation">(</span>scope <span class="token operator">=</span> <span class="token class-name">WQStrategyKeyEnum</span><span class="token punctuation">.</span><span class="token constant">DEVICE</span><span class="token punctuation">,</span> strategyKey <span class="token operator">=</span> <span class="token string">"1"</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Device2</span> <span class="token keyword">extends</span> <span class="token class-name">WQStrategyContext</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 设备触发</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


