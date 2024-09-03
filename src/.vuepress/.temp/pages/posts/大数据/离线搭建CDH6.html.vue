<template><div><h3 id="_1、搭建前规划" tabindex="-1"><a class="header-anchor" href="#_1、搭建前规划" aria-hidden="true">#</a> 1、搭建前规划</h3>
<table>
<thead>
<tr>
<th>操作系统</th>
<th>hostname</th>
<th>ip</th>
<th>角色</th>
</tr>
</thead>
<tbody>
<tr>
<td>CentOS7.9(64位)</td>
<td>master</td>
<td>192.168.10.249</td>
<td>主节点</td>
</tr>
<tr>
<td>CentOS7.9(64位)</td>
<td>slave01</td>
<td>192.168.10.253</td>
<td>从节点</td>
</tr>
</tbody>
</table>
<h3 id="_2、搭建前的准备" tabindex="-1"><a class="header-anchor" href="#_2、搭建前的准备" aria-hidden="true">#</a> 2、搭建前的准备</h3>
<h4 id="_2-1、每个节点修改hostname" tabindex="-1"><a class="header-anchor" href="#_2-1、每个节点修改hostname" aria-hidden="true">#</a> 2.1、每个节点修改hostname，</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 192.168.10.249 执行</span>
hostnamectl set-hostname master

<span class="token comment">#192.168.10.253上执行</span>
hostnamectl set-hostname slave01

<span class="token comment"># 所有节点需要修改hosts文件</span>
<span class="token function">vim</span> /etc/hosts

<span class="token comment"># 加入以下内容</span>
<span class="token number">192.168</span>.10.249 master
<span class="token number">192.168</span>.10.250 slave01 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2、关闭防火墙-安全认证selinux" tabindex="-1"><a class="header-anchor" href="#_2-2、关闭防火墙-安全认证selinux" aria-hidden="true">#</a> 2.2、关闭防火墙，安全认证selinux</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld

<span class="token comment"># 修改selinux 为disabled 如：SELINUX=disabled</span>
<span class="token function">vi</span> /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3、各个节点之间免密登录" tabindex="-1"><a class="header-anchor" href="#_2-3、各个节点之间免密登录" aria-hidden="true">#</a> 2.3、各个节点之间免密登录</h4>
<p>所有节点执行以下命令，在/root/.ssh/会生成id_rsa(私钥)和id_rsa.pub（公钥）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所有服务节点将公钥复制到authorized_keys，并赋予authorized_keys600权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> ~/.ssh/id_rsa.pub <span class="token operator">>></span> ~/.ssh/authorized_keys
<span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>所有节点的authorized_keys复制汇总到master节点authorized_keys!! 然后复制 master 的 authorized_keys</p>
<h4 id="_2-4、配置ntp服务-所有节点时间同步-目前部署的服务器时间都是一样的-所以跳过" tabindex="-1"><a class="header-anchor" href="#_2-4、配置ntp服务-所有节点时间同步-目前部署的服务器时间都是一样的-所以跳过" aria-hidden="true">#</a> 2.4、配置NTP服务（所有节点时间同步，目前部署的服务器时间都是一样的，所以跳过）</h4>
<h4 id="_2-5、-修改linux-swap-参数-所有节点" tabindex="-1"><a class="header-anchor" href="#_2-5、-修改linux-swap-参数-所有节点" aria-hidden="true">#</a> 2.5、 修改Linux swap 参数(所有节点）</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 临时修改swap为0</span>
<span class="token builtin class-name">echo</span> <span class="token number">0</span> <span class="token operator">></span> /proc/sys/vm/swappiness 

<span class="token comment"># 永久修改</span>
<span class="token function">vim</span> /etc/sysctl.conf 加入
<span class="token assign-left variable">vm.swappiness</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token comment">## 注意上述方法可能失败，centos5之前适用，centos7+如果不适用，可以尝试：</span>
<span class="token builtin class-name">cd</span> /usr/lib/tuned/

<span class="token comment"># 直接输入以下命令，然后把文件中的 swappiness 的都修改为0</span>
<span class="token function">grep</span> <span class="token string">"vm.swappiness"</span> * <span class="token parameter variable">-R</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-6、禁用透明页-所有节点" tabindex="-1"><a class="header-anchor" href="#_2-6、禁用透明页-所有节点" aria-hidden="true">#</a> 2.6、禁用透明页(所有节点）</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> never <span class="token operator">></span> /sys/kernel/mm/transparent_hugepage/defrag
<span class="token builtin class-name">echo</span> never <span class="token operator">></span>/sys/kernel/mm/transparent_hugepage/enabled

<span class="token builtin class-name">echo</span> <span class="token string">'echo never > /sys/kernel/mm/transparent_hugepage/defrag'</span> <span class="token operator">>></span> /etc/rc.local
<span class="token builtin class-name">echo</span> <span class="token string">'echo never >/sys/kernel/mm/transparent_hugepage/enabled'</span> <span class="token operator">>></span> /etc/rc.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-7、配置jdk1-8-所有节点" tabindex="-1"><a class="header-anchor" href="#_2-7、配置jdk1-8-所有节点" aria-hidden="true">#</a> 2.7、配置jdk1.8,（所有节点）</h4>
<h4 id="_2-8、mysql-jdbc包-所有节点" tabindex="-1"><a class="header-anchor" href="#_2-8、mysql-jdbc包-所有节点" aria-hidden="true">#</a> 2.8、mysql-jdbc包（所有节点）</h4>
<p>创建/usr/share/java目录，将mysql-jdbc包放过去（所有节点）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/share/java

<span class="token comment"># 手动上传包，修改包名为：mysql-connector-java.jar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-9、mysql安装-master节点" tabindex="-1"><a class="header-anchor" href="#_2-9、mysql安装-master节点" aria-hidden="true">#</a> 2.9、Mysql安装（master节点）</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 卸载mariadb：rpm -qa|grep mariadb</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span> mariadb-libs-5.5.60-1.el7_5.x86_64

<span class="token comment"># 删除依赖</span>
yum remove mysql-libs

<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span>  mysql


<span class="token builtin class-name">cd</span> /opt/mysql/
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> ./mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-common-5.7.19-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-libs-5.7.19-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-client-5.7.19-1.el7.x86_64.rpm

<span class="token comment">#之前需要安装</span>
yum <span class="token function">install</span> net-tools
yum <span class="token function">install</span> libaio


<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-server-5.7.19-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-libs-compat-5.7.19-1.el7.x86_64.rpm
<span class="token comment"># MYSQL配置:</span>
mysqld <span class="token parameter variable">--initialize</span> <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token comment"># 初始化mysql使mysql目录的拥有者为mysql用户</span>
<span class="token function">cat</span> /var/log/mysqld.log <span class="token comment"># 最后一行将会有随机生成的密码</span>
systemctl start mysqld.service <span class="token comment"># 设置mysql服务自启</span>
mysql <span class="token parameter variable">-uroot</span> –p 如果不能登陆
<span class="token comment"># 设置免密登录并重启mysql服务(先开启免密登陆,设置完密码以后,一定要注释了restart)</span>
<span class="token function">vi</span> /etc/my.cnf

<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
skip-grant-tables


$<span class="token operator">></span>mysql <span class="token parameter variable">-u</span> root
mysql<span class="token operator">></span>use mysql<span class="token punctuation">;</span>
mysql<span class="token operator">></span>update user <span class="token builtin class-name">set</span> authentication_string <span class="token operator">=</span> password<span class="token punctuation">(</span><span class="token string">'123456'</span><span class="token punctuation">)</span>, password_expired <span class="token operator">=</span> <span class="token string">'N'</span>, password_last_changed <span class="token operator">=</span> now<span class="token punctuation">(</span><span class="token punctuation">)</span> where user <span class="token operator">=</span> <span class="token string">'root'</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span>exit<span class="token punctuation">;</span>

mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span>

<span class="token comment">#创建数据库</span>
CREATE DATABASE cmserver DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span> 
GRANT ALL ON cmserver.* TO <span class="token string">'cmserver'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span> 
CREATE DATABASE metastore DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span> 
GRANT ALL ON metastore.* TO <span class="token string">'hive'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span> 
CREATE DATABASE amon DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span> 
GRANT ALL ON amon.* TO <span class="token string">'amon'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span> 
CREATE DATABASE rman DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span>
GRANT ALL ON rman.* TO <span class="token string">'rman'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span> 
CREATE DATABASE oozie DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span> 
GRANT ALL ON oozie.* TO <span class="token string">'oozie'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span> 
CREATE DATABASE hue DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span> 
GRANT ALL ON hue.* TO <span class="token string">'hue'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span> 
CREATE DATABASE nav DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span> 
GRANT ALL ON nav.* TO <span class="token string">'nav'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span> 
CREATE DATABASE navms DEFAULT CHARSET utf8 COLLATE utf8_general_ci<span class="token punctuation">;</span>
GRANT ALL ON navms.* TO <span class="token string">'navms'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'Yyf5211314!'</span><span class="token punctuation">;</span>


GRANT ALL PRIVILEGES ON *.* TO <span class="token string">'root'</span>@<span class="token string">'%'</span> IDENTIFIED BY <span class="token string">'pwd'</span> WITH GRANT OPTION<span class="token punctuation">;</span> 
flush privileges<span class="token punctuation">;</span>

use mysql

<span class="token keyword">select</span> host, user from user<span class="token punctuation">;</span> +-----------+---------------+ <span class="token operator">|</span> <span class="token function">host</span> <span class="token operator">|</span> user <span class="token operator">|</span> +-----------+---------------+ <span class="token operator">|</span> % <span class="token operator">|</span> amon <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> amonuser <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> cmserver <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> cmserveruser <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> hive <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> hiveuser <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> hue <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> hueuser <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> nav <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> navms <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> oozie <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> oozieuser <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> rman <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> rmanuser <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> root <span class="token operator">|</span> <span class="token operator">|</span> % <span class="token operator">|</span> sentry <span class="token operator">|</span> <span class="token operator">|</span> localhost <span class="token operator">|</span> mysql.session <span class="token operator">|</span> <span class="token operator">|</span> localhost <span class="token operator">|</span> mysql.sys <span class="token operator">|</span> <span class="token operator">|</span> localhost <span class="token operator">|</span> root <span class="token operator">|</span> +-----------+---------------+
GRANT ALL PRIVILEGES ON *.* TO <span class="token string">'root'</span>@<span class="token string">'%'</span>IDENTIFIED BY <span class="token string">'123456'</span> WITH GRANT OPTION<span class="token punctuation">;</span> 
FLUSH PRIVILEGES<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-10、安装httpd服务-master节点" tabindex="-1"><a class="header-anchor" href="#_2-10、安装httpd服务-master节点" aria-hidden="true">#</a> 2.10、安装Httpd服务（master节点）</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> httpd
<span class="token function">service</span> httpd start
<span class="token comment"># 设置 HTTPD 服务开机自启, 主要作用是为3做cdh本地yum源下载使用</span>
systemctl <span class="token builtin class-name">enable</span> httpd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、安装cdh相关服务" tabindex="-1"><a class="header-anchor" href="#_3、安装cdh相关服务" aria-hidden="true">#</a> 3、安装cdh相关服务</h3>
<h4 id="_3-1、配置cloudera-manager包-配置本地yum源-master节点" tabindex="-1"><a class="header-anchor" href="#_3-1、配置cloudera-manager包-配置本地yum源-master节点" aria-hidden="true">#</a> 3.1、配置Cloudera Manager包,配置本地yum源（master节点）</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 本来没有这文件的，需要新增，加入以下文件</span>
<span class="token function">vi</span> /etc/yum.repos.d/cloudera-manager.repo

<span class="token punctuation">[</span>cloudera-manager<span class="token punctuation">]</span> 
name <span class="token operator">=</span> Cloudera Manager, Version 
baseurl <span class="token operator">=</span> http://master/cloudera-repos/cm6/ 
gpgcheck <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把以下的安装包放到服务器上，放上去之后，通过 <a href="http://master/cloudera-repos/cm6/" target="_blank" rel="noopener noreferrer">http://master/cloudera-repos/cm6/<ExternalLinkIcon/></a> 访问到</p>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/cdh.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>注意：repodata文件夹下需要走命令生成，而且走命令之前需要先去掉3.1配置文件 /etc/yum.repos.d/cloudera-manager.repo</p>
<p>createrepo .</p>
<h4 id="_3-2、安装" tabindex="-1"><a class="header-anchor" href="#_3-2、安装" aria-hidden="true">#</a> 3.2、安装</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum clean all
yum makecache

<span class="token comment"># 导入GPG key（如果没有这步操作，很可能cloudera服务安装失败）master节点 </span>
<span class="token function">rpm</span> <span class="token parameter variable">--import</span> http://master/cloudera-repos/cm6/RPM-GPG-KEY-cloudera
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3、安装-cloudera-manager-master节点" tabindex="-1"><a class="header-anchor" href="#_3-3、安装-cloudera-manager-master节点" aria-hidden="true">#</a> 3.3、安装 Cloudera Manager（master节点）</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> cloudera-manager-daemons cloudera-manager-agent cloudera-manager-server

<span class="token comment"># 安装完CM后/opt/ 下会出现cloudera目录 将parcel包移动到指定位置</span>
<span class="token function">mv</span> /opt/parcels/* /opt/cloudera/parcel-repo

<span class="token comment"># 在/opt/cloudera/parcel-repo执行以下命令：</span>
sha1sum CDH-6.2.0-1.cdh6.2.0.p0.967373-el7.parcel <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{ print $1 }'</span> <span class="token operator">></span> CDH-6.2.0-1.cdh6.2.0.p0.967373-el7.parcel.sha


<span class="token comment"># 执行初始化脚本:Yyf5211314!和上面设置的对应的数据库的密码保持一直</span>
/opt/cloudera/cm/schema/scm_prepare_database.sh mysql cmserver cmserveruser Yyf5211314<span class="token operator">!</span>

<span class="token comment"># 打开server服务:</span>
systemctl restart cloudera-scm-agent
systemctl restart cloudera-scm-server


<span class="token comment"># 踩坑注意！jdk需要软连接到具体目录下</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/java
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/jdk/jdk1.8.0_281/ /usr/java/default

<span class="token comment"># 静候几分钟，打开http://master:7180</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


