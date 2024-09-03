<template><div><h3 id="_1、认识network和networkmanager" tabindex="-1"><a class="header-anchor" href="#_1、认识network和networkmanager" aria-hidden="true">#</a> 1、认识network和NetworkManager</h3>
<p>先说结论，在CentOS系统中，network服务和NetworkManager是两个常用的网络管理工具，它们之间有一定的关系，但是也有区别：</p>
<div class="language-textmate line-numbers-mode" data-ext="textmate"><pre v-pre class="language-textmate"><code>network：network服务是在CentOS 6及更早版本中使用的传统网络管理方式。它使用
/etc/sysconfig/network-scripts/目录下的配置文件来管理网络接口和网络设置。
通过编辑这些配置文件，您可以手动配置网络接口、IP地址、网关、DNS等网络参数。
network服务提供了较为底层的网络管理功能，适用于服务器环境或不需要频繁变动网络配置的情况。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-textmate line-numbers-mode" data-ext="textmate"><pre v-pre class="language-textmate"><code>NetworkManager：NetworkManager是在CentOS 7及更新的版本中引入的新一代网络管理工具。
它提供了更高级的网络管理功能，并且支持动态配置和自动检测网络接口。NetworkManager可以
通过图形界面或命令行进行配置，并且支持各种网络连接类型，包括有线连接、Wi-Fi连接、
移动蜂窝数据连接等。NetworkManager通过/etc/NetworkManager/目录下的配置文件来管理网络设置。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然network服务和NetworkManager都可以用于配置网络，但它们之间存在一些差异。在CentOS系统中，默认情况下，NetworkManager会管理网络接口，而network服务会被禁用。如果您需要使用传统的network服务进行网络配置，可以通过停止和禁用NetworkManager服务，并启用network服务来实现。</p>
<h3 id="_2、故障分析" tabindex="-1"><a class="header-anchor" href="#_2、故障分析" aria-hidden="true">#</a> 2、故障分析</h3>
<p>现象：服务器换了个路由器网络接口后报错，启动网卡失败。</p>
<h4 id="_2-1-首先要学会分析启动失败问题定位" tabindex="-1"><a class="header-anchor" href="#_2-1-首先要学会分析启动失败问题定位" aria-hidden="true">#</a> 2.1 首先要学会分析启动失败问题定位</h4>
<pre><code>service network start
service NetworkManager stop

systemctl disable NetworkManager # 禁用另一个网络管理器

journalctl -xe # 如果这个过程命令失败了,一般可以看到失败原因
</code></pre>
<p>在目录：/etc/sysconfig/network-scripts/ 下修改ifcfg-eno1 内容<br>
ps: 这里面的内容，如果是网口不对，显示的内容也会不一样。所以要正确配置。</p>
<div class="language-editorconfig line-numbers-mode" data-ext="editorconfig"><pre v-pre class="language-editorconfig"><code><span class="token key attr-name">TYPE</span><span class="token value attr-value"><span class="token punctuation">=</span>"Ethernet"</span>
<span class="token key attr-name">BOOTPROTO</span><span class="token value attr-value"><span class="token punctuation">=</span>"none"</span>
<span class="token key attr-name">DEFROUTE</span><span class="token value attr-value"><span class="token punctuation">=</span>"yes"</span>
<span class="token key attr-name">IPV4_FAILURE_FATAL</span><span class="token value attr-value"><span class="token punctuation">=</span>"no"</span>
<span class="token key attr-name">IPV6INIT</span><span class="token value attr-value"><span class="token punctuation">=</span>"yes"</span>
<span class="token key attr-name">IPV6_AUTOCONF</span><span class="token value attr-value"><span class="token punctuation">=</span>"yes"</span>
<span class="token key attr-name">IPV6_DEFROUTE</span><span class="token value attr-value"><span class="token punctuation">=</span>"yes"</span>
<span class="token key attr-name">IPV6_FAILURE_FATAL</span><span class="token value attr-value"><span class="token punctuation">=</span>"no"</span>
<span class="token key attr-name">IPV6_ADDR_GEN_MODE</span><span class="token value attr-value"><span class="token punctuation">=</span>"stable-privacy"</span>
<span class="token key attr-name">NAME</span><span class="token value attr-value"><span class="token punctuation">=</span>"eno1"</span>
<span class="token key attr-name">UUID</span><span class="token value attr-value"><span class="token punctuation">=</span>"57b8cde2-73a0-493e-9d98-8473f42e33dd"</span>
<span class="token key attr-name">DEVICE</span><span class="token value attr-value"><span class="token punctuation">=</span>"eno1"</span>
<span class="token key attr-name">ONBOOT</span><span class="token value attr-value"><span class="token punctuation">=</span>"yes"</span>
<span class="token key attr-name">IPADDR</span><span class="token value attr-value"><span class="token punctuation">=</span>"192.168.10.248"</span>
<span class="token key attr-name">PREFIX</span><span class="token value attr-value"><span class="token punctuation">=</span>"24"</span>
<span class="token key attr-name">GATEWAY</span><span class="token value attr-value"><span class="token punctuation">=</span>"192.168.10.254"</span>
<span class="token key attr-name">DNS1</span><span class="token value attr-value"><span class="token punctuation">=</span>"192.168.10.254"</span>
<span class="token key attr-name">IPV6_PEERDNS</span><span class="token value attr-value"><span class="token punctuation">=</span>"yes"</span>
<span class="token key attr-name">IPV6_PEERROUTES</span><span class="token value attr-value"><span class="token punctuation">=</span>"yes"</span>
<span class="token key attr-name">IPV6_PRIVACY</span><span class="token value attr-value"><span class="token punctuation">=</span>"no"</span>
<span class="token key attr-name">NM_CONTROLLED</span><span class="token value attr-value"><span class="token punctuation">=</span>"no"</span>
<span class="token comment">#HWADDR="6c:0b:84:be:14:3c"</span>
<span class="token comment">#hw="6c:0b:84:be:14:3c"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改后启动：</p>
<p>ifconfig eno1 down</p>
<p>ifconfig eno1 up</p>
<p>最后重启：service network start</p>
</div></template>


