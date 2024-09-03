<template><div><h3 id="mysql调优" tabindex="-1"><a class="header-anchor" href="#mysql调优" aria-hidden="true">#</a> mysql调优</h3>
<ul>
<li>开启慢sql日志配置<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>[mysqld]
# 慢查询开启：1  关闭：0

  slow_query_log = 1

  # 慢查询日志记录
  slow_query_log_file = /var/log/mysql/mysql-slow.log

  # 慢查询时间 一般10S， 这里0.1只是为了验证
  long_query_time = 0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>查询慢sql是否开启等功能 命令<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  <span class="token comment"># 查看慢sql是否开启及参数</span>
  show variables like <span class="token string">'%slow%'</span><span class="token punctuation">;</span>
  show variables like <span class="token string">'%long_query%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>binlog
<ul>
<li>开启binlog日志功能 配置<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># binlog 配置
log-bin = /var/log/mysql/mysql-bin.log

# 过期时间 3600 * 24 * 7, 默认是30天
binlog_expire_logs_seconds = 604800

# binlog最大容量 默认是 1G
max_binlog_size = 500M

# server-id 配置
server-id = 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>查看binlog 命令<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># mysql8 默认开启</span>
  SHOW VARIABLES LIKE <span class="token string">'log_bin'</span><span class="token punctuation">;</span>

<span class="token comment"># 查看现有在用的binlog日志</span>
  SHOW master logs<span class="token punctuation">;</span>

<span class="token comment"># 手动清除binlog日志</span>
 reset master<span class="token punctuation">;</span>

<span class="token comment"># 关闭binlog</span>
<span class="token function">vim</span> /etc/my.cnf

<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
skip-log-bin

<span class="token comment"># 查看binlog过期时间</span>
show variables like <span class="token string">'%binlog_expire_logs_seconds%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/mysql/mysql1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li>
</ul>
</li>
</ul>
</div></template>


