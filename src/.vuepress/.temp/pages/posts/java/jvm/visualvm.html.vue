<template><div><h1 id="visualvm" tabindex="-1"><a class="header-anchor" href="#visualvm" aria-hidden="true">#</a> visualVm</h1>
<p>1、JDK14起，已不再集成visualvm，需要自己去visualvm官网下载。</p>
<p>下载地址：<a href="https://visualvm.github.io/" target="_blank" rel="noopener noreferrer">https://visualvm.github.io/<ExternalLinkIcon/></a></p>
<p>2、下载完成后，在etc文件夹下找到visualvm.conf文件，打开，并设置jdk路径。<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/visualvmConfig.png" alt="img.png" loading="lazy"></p>
<h3 id="visualvm-远程调试" tabindex="-1"><a class="header-anchor" href="#visualvm-远程调试" aria-hidden="true">#</a> visualVm 远程调试</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">java</span> <span class="token punctuation">\</span>
<span class="token comment">#指定JMX RMI (Remote Method Invocation) 通信所使用的端口号</span>
<span class="token parameter variable">-Dcom.sun.management.jmxremote.rmi.port</span><span class="token operator">=</span><span class="token number">1232</span> <span class="token punctuation">\</span>
<span class="token comment">#指定JMXMP (JMX Messaging Protocol) 通信所使用的端口号</span>
<span class="token parameter variable">-Dcom.sun.management.jmxremote.port</span><span class="token operator">=</span><span class="token number">1232</span> <span class="token punctuation">\</span>
<span class="token comment">#不使用ssl</span>
<span class="token parameter variable">-Dcom.sun.management.jmxremote.ssl</span><span class="token operator">=</span>false <span class="token punctuation">\</span>
<span class="token comment">#不启用身份认证</span>
<span class="token parameter variable">-Dcom.sun.management.jmxremote.authenticate</span><span class="token operator">=</span>false <span class="token punctuation">\</span>
<span class="token parameter variable">-jar</span> <span class="token variable">${你的jar包名}</span>.jar

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装插件使用visualgc-查看gc的暂停时间-gc频率" tabindex="-1"><a class="header-anchor" href="#安装插件使用visualgc-查看gc的暂停时间-gc频率" aria-hidden="true">#</a> 安装插件使用visualGC 查看GC的暂停时间，GC频率</h3>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/visualGC.png" alt="img.png" tabindex="0" loading="lazy"><figcaption>img.png</figcaption></figure>
</div></template>


