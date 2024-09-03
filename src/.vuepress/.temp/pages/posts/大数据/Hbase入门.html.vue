<template><div><h1 id="hbase-简单介绍" tabindex="-1"><a class="header-anchor" href="#hbase-简单介绍" aria-hidden="true">#</a> Hbase 简单介绍</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># hbase常用命令</span>
 create_namespace  <span class="token string">'**'</span> <span class="token comment"># 创建命名空间</span>
 drop_namespace <span class="token string">'**'</span> <span class="token comment"># 删除命名空间</span>
 list_namespace  <span class="token comment"># 查询所有命名空间</span>
 list_namespace_tables <span class="token string">'**'</span>  <span class="token comment"># 查看命名空间下的表</span>
 
 create <span class="token string">'wquser'</span>, <span class="token string">'info'</span>, <span class="token string">'data'</span> <span class="token comment"># 创建表</span>
 create <span class="token string">'wq:wquser1'</span>, <span class="token string">'info'</span>, <span class="token string">'data'</span> <span class="token comment"># 创建命名空间下的表</span>
 put <span class="token string">'wquser'</span>, <span class="token string">'tom'</span>, <span class="token string">'22age'</span> <span class="token comment"># 插入数据</span>
 put <span class="token string">'user'</span>, <span class="token string">'rk0001'</span>, <span class="token string">'info:name'</span>
 
 
  create <span class="token string">'SYSTEM:wquser2'</span>, <span class="token string">'info'</span>, <span class="token string">'data'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


