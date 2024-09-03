<template><div><h1 id="秒杀系统方案" tabindex="-1"><a class="header-anchor" href="#秒杀系统方案" aria-hidden="true">#</a> 秒杀系统方案</h1>
<h3 id="_1、秒杀方案一般需要分为多个步骤-主要分为-前端、后端、代理层等" tabindex="-1"><a class="header-anchor" href="#_1、秒杀方案一般需要分为多个步骤-主要分为-前端、后端、代理层等" aria-hidden="true">#</a> 1、秒杀方案一般需要分为多个步骤，主要分为：前端、后端、代理层等</h3>
<h4 id="_1-1-前端-对前端来讲-请求限制-按钮防呆功能是必不可少的-视情况而定-一般按钮10s后才允许二次请求。" tabindex="-1"><a class="header-anchor" href="#_1-1-前端-对前端来讲-请求限制-按钮防呆功能是必不可少的-视情况而定-一般按钮10s后才允许二次请求。" aria-hidden="true">#</a> 1.1：前端，对前端来讲，请求限制，按钮防呆功能是必不可少的，视情况而定，一般按钮10s后才允许二次请求。</h4>
<h4 id="_1-2-后端限流-对后端来讲秒杀的前提还需要做限流" tabindex="-1"><a class="header-anchor" href="#_1-2-后端限流-对后端来讲秒杀的前提还需要做限流" aria-hidden="true">#</a> 1.2：后端限流，对后端来讲秒杀的前提还需要做限流</h4>
<Tabs id="12" :data='[{"id":"nginx/lvs"},{"id":"nacos/zk/eureka/dubbo"},{"id":"边车负载均衡模式 service mesh"}]' :active="0">
<template #title0="{ value, isActive }">nginx/lvs</template>
<template #title1="{ value, isActive }">nacos/zk/eureka/dubbo</template>
<template #title2="{ value, isActive }">边车负载均衡模式 service mesh</template>
<template #tab0="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>这种模式在微服务之前的架构模式中普遍采用，一般都是用nginx或者lvs来做的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>微服务流行之后，目前主流的模式变成了下面这样，通过服务注册中心将服务地址发布出去，客户端得到地址后在消费者端进行负载均衡。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>下一代微服务架构中将对负载均衡进行沉淀到独立的进程中，最大的变化就是和业务应用完全解耦了。
上面那句话是什么意思呢？
一般我们负载均衡或者限流都是在注册中心或者微服务网关中做，但是这样是全局上的限流。如果后续使用K8S
K8s中pod是一个微服务，如果pod中再加个边车服务做限流，这样就能下沉到具体的微服务上做分流，而且简单高效。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h4 id="_1-3-后端秒杀流程" tabindex="-1"><a class="header-anchor" href="#_1-3-后端秒杀流程" aria-hidden="true">#</a> 1.3：后端秒杀流程</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1、限流拦截，使用Google guava的RateLimiter来进行限流
每秒钟只允许10个人进入秒杀步骤. (可能是拦截掉90%的用户请求，拦截后直接返回"很遗憾，没抢到")

2、Redis判断是否秒杀过。避免重复秒杀。如果没有秒杀过
把用户名（这里是手机号）和seckillId封装成一条消息发送到RabbitMQ，请求变成被顺序串行处理
立即返回状态“排队中”到客户端上，客户端上回显示“排队中...”

3、后台监听RabbitMQ里消息，每次取一条消息，并解析后，请求Redis做库存减1操作（decr命令）
并手动ACK队列 如果减库存成功，则在Redis里记录下库存成功的用户手机号userPhone.

4、客户端排队成功后，定时请求后台查询是否秒杀成功，后面会去查询Redis是否秒杀成功
如果抢购成功，或者抢购失败则停止定时查询， 如果是排队中，则继续定时查询

源码地址：https://github.com/chenweiquan-red/jseckill.git

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


