<template><div><h3 id="_1、jvm调优-性能分析命令" tabindex="-1"><a class="header-anchor" href="#_1、jvm调优-性能分析命令" aria-hidden="true">#</a> 1、JVM调优，性能分析命令</h3>
<h4 id="_1、jstack指令的命令格式为-jstack-option-pid" tabindex="-1"><a class="header-anchor" href="#_1、jstack指令的命令格式为-jstack-option-pid" aria-hidden="true">#</a> 1、jstack指令的命令格式为：jstack [ option ] pid</h4>
<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-F</td>
<td>不影响当前请求情况下，强制输出线程堆栈</td>
</tr>
<tr>
<td>-l</td>
<td>除了堆栈外，显示关于锁的附加信息</td>
</tr>
<tr>
<td>-m</td>
<td>如果调用本地方法，可以显示C/C++的堆栈信息</td>
</tr>
<tr>
<td>-h</td>
<td>获取帮助</td>
</tr>
</tbody>
</table>
<p>1.1、 jstack</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jstack <span class="token number">24916</span>

jstack <span class="token number">62977</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"waiting"</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span> <span class="token comment"># 查询关键信息，或者子线程信息</span>

jstack <span class="token number">62977</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">'nid'</span> <span class="token parameter variable">-C5</span> <span class="token parameter variable">-color</span> <span class="token comment"># 颜色标注</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jstack.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


