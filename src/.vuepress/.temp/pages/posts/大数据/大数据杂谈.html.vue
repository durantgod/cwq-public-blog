<template><div><h3 id="_1、大数据在物联网行业的应用" tabindex="-1"><a class="header-anchor" href="#_1、大数据在物联网行业的应用" aria-hidden="true">#</a> 1、大数据在物联网行业的应用</h3>
<pre><code>目前应用主要是物联网周报，日报，月报，当然也有各种大屏展示及可视化报表。
</code></pre>
<h3 id="_2、大数据之实时数仓-离线数仓" tabindex="-1"><a class="header-anchor" href="#_2、大数据之实时数仓-离线数仓" aria-hidden="true">#</a> 2、大数据之实时数仓，离线数仓</h3>
<h5 id="_2-1、实时数仓所用技术栈链路一般是-flinkcdc-kafka-flink-hbase-hive" tabindex="-1"><a class="header-anchor" href="#_2-1、实时数仓所用技术栈链路一般是-flinkcdc-kafka-flink-hbase-hive" aria-hidden="true">#</a> 2.1、实时数仓所用技术栈链路一般是：flinkCDC/kafka--flink--&gt;hbase/hive</h5>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>dataflow:数据流动，有向无环图，也称为逻辑图
flink 的dataflow大概为：source ---> transformate ---> sink
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-2、离线数仓所用技术栈一般是-datax-sqoop-kafka-spark-hive-hbase" tabindex="-1"><a class="header-anchor" href="#_2-2、离线数仓所用技术栈一般是-datax-sqoop-kafka-spark-hive-hbase" aria-hidden="true">#</a> 2.2、离线数仓所用技术栈一般是：DataX/Sqoop---&gt; kafka ---&gt; spark ---&gt; hive/hbase</h5>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>spark计算：hive on spark or spark on hive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


