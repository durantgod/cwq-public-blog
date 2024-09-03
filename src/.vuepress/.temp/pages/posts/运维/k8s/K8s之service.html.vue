<template><div><h1 id="k8s之service" tabindex="-1"><a class="header-anchor" href="#k8s之service" aria-hidden="true">#</a> K8s之service</h1>
<h4 id="_1、官方解释" tabindex="-1"><a class="header-anchor" href="#_1、官方解释" aria-hidden="true">#</a> 1、官方解释:</h4>
<p>Kubernetes Service定义了这样一种抽象： Service是一种可以访问 Pod逻辑分组的策略， Service通常是通过 Label Selector访问 Pod组。<br>
Service能够提供负载均衡的能力，但是在使用上有以下限制：只提供 4 层负载均衡能力，而没有 7 层功能，但有时我们可能需要更多的匹配规则来转发请求，这点上 4 层负载均衡是不支持的</p>
<p>通俗来说：pod Ip是不固定的，集群后会随机均衡落在每个node上，所以需要统一一个入口，如果该服务需要负载均衡，那就是定义为service, service是一个服务多个<br>
pod的集合。</p>
<h4 id="_2、service-的四种类型" tabindex="-1"><a class="header-anchor" href="#_2、service-的四种类型" aria-hidden="true">#</a> 2、service 的四种类型</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1、ClusterIp 默认类型，是集群内部自动分配的虚拟IP

2、NodePort 是在ClusterIp的基础上，加上节点端口映射，如果需要集群外访问，比如网关，或者网关相应的端口开发出去就需要用到该类型。

3、HeadLiness 这类Service不会分配Cluster IP，如果想要访问service，只能通过service的域名进行查询。

4、LoadBalancer LoadBalancer和NodePort很相似，目的都是向外部暴露一个端口，区别在于LoadBalancer会在集群的外部再来做一个负载均衡设备，而这个设备需要外部环境支持的，外部服务发送到这个设备上的请求，会被设备负载之后转发到集群中。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


