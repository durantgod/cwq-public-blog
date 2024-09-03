<template><div><h3 id="vsftp-简单介绍" tabindex="-1"><a class="header-anchor" href="#vsftp-简单介绍" aria-hidden="true">#</a> vsftp 简单介绍</h3>
<h4 id="vsftp-有三种用户模式" tabindex="-1"><a class="header-anchor" href="#vsftp-有三种用户模式" aria-hidden="true">#</a> vsftp 有三种用户模式</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 首先安装ftp环境</span>
yum <span class="token function">install</span> vsftpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><Tabs id="7" :data='[{"id":"匿名用户模式"},{"id":"本地用户模式"},{"id":"虚拟用户模式"}]' :active="0">
<template #title0="{ value, isActive }">匿名用户模式</template>
<template #title1="{ value, isActive }">本地用户模式</template>
<template #title2="{ value, isActive }">虚拟用户模式</template>
<template #tab0="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vim /etc/vsftpd/vsftpd.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">anon_root</span><span class="token operator">=</span>/var/www/
<span class="token assign-left variable">anon_upload_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_mkdir_write_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_other_write_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_umask</span><span class="token operator">=</span>022
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缺点：安全性很差，只要知道IP都能登录ftp</p>
</template>
<template #tab1="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vim /etc/vsftpd/vsftpd.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>禁用匿名模式</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#禁用匿名模式</span>
<span class="token assign-left variable">anonymous_enable</span><span class="token operator">=</span>NO

<span class="token comment">#限制用从/var/www/html切换到上一级目录</span>
<span class="token assign-left variable">chroot_local_user</span><span class="token operator">=</span>YES

<span class="token comment">#指定用户登陆后的默认目录</span>
<span class="token assign-left variable">local_root</span><span class="token operator">=</span>/var/www/html

<span class="token comment">#设置启用用户不能切换目录后的上传,删除,改名等权限</span>
<span class="token assign-left variable">allow_writeable_chroot</span><span class="token operator">=</span>YES
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 新建本地用户并设置密码</span>

<span class="token comment">#加 -s /sbin/nologin意思是该用户不能以系统用户身份登陆到centos系统中,只能作为ftp的用户登陆到ftp用</span>
<span class="token function">useradd</span> <span class="token parameter variable">-s</span> /sbin/nologin hhdlink001
<span class="token builtin class-name">echo</span> <span class="token string">"hhdlink001:hhdlink001@ftp"</span> <span class="token operator">|</span>chpasswd

<span class="token comment"># 设置/var/www/html 目录写入权限</span>
<span class="token function">chmod</span> o+w /var/www/html <span class="token parameter variable">-R</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p></p>
</template>
<template #tab2="{ value, isActive }">
<p>安装pam认证方式</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 安装pam认证方式</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> pam pam-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 添加虚拟用户映射的本地用户</span>
<span class="token function">useradd</span> <span class="token parameter variable">-s</span> /sbin/nologin virftp
<span class="token builtin class-name">echo</span> <span class="token string">"virftp:123"</span> <span class="token operator">|</span>chpasswd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 修改配置文件</span>
<span class="token function">vim</span> /etc/vsftpd/vsftpd.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">write_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">dirmessage_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">xferlog_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">connect_from_port_20</span><span class="token operator">=</span>YES
<span class="token assign-left variable">xferlog_std_format</span><span class="token operator">=</span>YES
<span class="token assign-left variable">listen</span><span class="token operator">=</span>YES
<span class="token assign-left variable">userlist_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">tcp_wrappers</span><span class="token operator">=</span>YES
<span class="token assign-left variable">allow_writeable_chroot</span><span class="token operator">=</span>YES
<span class="token assign-left variable">guest_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">guest_username</span><span class="token operator">=</span>vsftpd
<span class="token assign-left variable">pam_service_name</span><span class="token operator">=</span>vsftpd
<span class="token assign-left variable">local_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">local_umask</span><span class="token operator">=</span>077
<span class="token assign-left variable">chroot_local_user</span><span class="token operator">=</span>YES
<span class="token assign-left variable">virtual_use_local_privs</span><span class="token operator">=</span>YES
<span class="token assign-left variable">user_config_dir</span><span class="token operator">=</span>/etc/vsftpd/vsftpd_virusers

<span class="token assign-left variable">pasv_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">pasv_max_port</span><span class="token operator">=</span><span class="token number">24600</span>
<span class="token assign-left variable">pasv_min_port</span><span class="token operator">=</span><span class="token number">24500</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加虚拟用户</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/vsftpd/vir_user  <span class="token comment">#奇数行为账号,偶数行为密码</span>

			
hhdlink001
hhdlink001@ftp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建虚拟用户数据库</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db_load <span class="token parameter variable">-T</span> <span class="token parameter variable">-t</span> <span class="token builtin class-name">hash</span> <span class="token parameter variable">-f</span> /etc/vsftpd/vir_user  /etc/vsftpd/vir_user.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改数据库权限属主权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">700</span> /etc/vsftpd/vir_user.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置pam验证文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> /etc/pam.d/vsftpd<span class="token punctuation">{</span>,.bak<span class="token punctuation">}</span>
<span class="token function">vim</span> /etc/pam.d/vsftpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将auth及account的所有配置行均注释掉，再添加如下两行</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>auth       required     pam_userdb.so   <span class="token assign-left variable">db</span><span class="token operator">=</span>/etc/vsftpd/vir_user  
account    required     pam_userdb.so   <span class="token assign-left variable">db</span><span class="token operator">=</span>/etc/vsftpd/vir_user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>单独配置虚拟用户的权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /etc/vsftpd/vsftpd_virusers/
<span class="token function">vim</span> /etc/vsftpd/vsftpd_virusers/hhdlink001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">anon_upload_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_mkdir_write_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_other_write_enable</span><span class="token operator">=</span>YES
<span class="token assign-left variable">anon_umask</span><span class="token operator">=</span>022
<span class="token assign-left variable">local_root</span><span class="token operator">=</span>/var/www/html
<span class="token assign-left variable">allow_writeable_chroot</span><span class="token operator">=</span>YES
<span class="token assign-left variable">chroot_local_user</span><span class="token operator">=</span>YES
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置 /var/www/html写入权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> o+w /var/www/html <span class="token parameter variable">-R</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</Tabs>
<p>注意：<br>
1、如果登录失败！提示：500 OOPS: cannot locate user entry:vsftpd</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">groupadd</span> vsftpd 
adduser <span class="token parameter variable">-g</span> vsftpd <span class="token parameter variable">-s</span> /sbin/nologin vsftpd 
systemctl restart vsftpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、如果上传文件失败</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>setsebool allow_ftpd_full_access on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、如果新增虚拟用户失败，提示：<br>
db_load: BDB5090 unexpected end of input data or key/data pair<br>
db_load: BDB5079 odd number of key/data pairs</p>
<p>可以在虚拟用户列表最后加回车</p>
<p>完整的vsftpd.conf</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>write_enable=YES
dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
xferlog_std_format=YES
listen=YES
userlist_enable=YES
tcp_wrappers=YES
allow_writeable_chroot=YES
guest_enable=YES
guest_username=vsftpd
pam_service_name=vsftpd
local_enable=YES
local_umask=077
chroot_local_user=YES
virtual_use_local_privs=YES
user_config_dir=/etc/vsftpd/vsftpd_virusers

pasv_enable=YES
pasv_max_port=24600
pasv_min_port=24500

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


