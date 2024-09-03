<template><div><h3 id="_1、jvm调优-性能分析命令" tabindex="-1"><a class="header-anchor" href="#_1、jvm调优-性能分析命令" aria-hidden="true">#</a> 1、JVM调优，性能分析命令</h3>
<p>1、jinfo指令的命令格式为： jinfo  [ options ] pid</p>
<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>no option</td>
<td>输出所有的参数和系统属性，包括默认值</td>
</tr>
<tr>
<td>-flag name</td>
<td>输出对应名称的参数</td>
</tr>
<tr>
<td>-flag [+-]name</td>
<td>开启或者关闭对应参数名称的参数，只有标记为manageable 的参数才可以被动态修改</td>
</tr>
<tr>
<td>-flag name=value</td>
<td>修改对应参数的值</td>
</tr>
<tr>
<td>-flags</td>
<td>输出全部的参数</td>
</tr>
<tr>
<td>-sysprops</td>
<td>输出系统属性，system.getProperties()</td>
</tr>
</tbody>
</table>
<p>1.1、 jinfo</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> jinfo <span class="token parameter variable">-flags</span> <span class="token number">24916</span> <span class="token comment"># 输出参数</span>

 <span class="token comment">#查看JVM是否使用了ParallelGC垃圾收集器</span>
 jinfo –flag UseParallelGC <span class="token number">15008</span>
 
  <span class="token comment">#新生代对象晋升到老年代对象的最大年龄</span>
 jinfo <span class="token parameter variable">-flag</span> MaxTenuringThreshold <span class="token number">15008</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfo.png" alt="" loading="lazy"><br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/jvm/jinfoflags.png" alt="" loading="lazy"></p>
</div></template>


