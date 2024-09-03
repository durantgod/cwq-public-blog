<template><div><h3 id="centos-系统磁盘-分区-逻辑分区等小常识" tabindex="-1"><a class="header-anchor" href="#centos-系统磁盘-分区-逻辑分区等小常识" aria-hidden="true">#</a> centos 系统磁盘，分区，逻辑分区等小常识</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lsblk <span class="token comment"># 查看所有的存储设备，包括硬盘，扩展硬盘</span>

<span class="token comment">#一般情况下, 存在sda,sdb两块硬盘, 如下图1所示有sda硬盘, 和两个逻辑分区cl-home,cl-root</span>

<span class="token function">fdisk</span> /dev/sdb <span class="token comment"># 表示对硬盘sdb进行分区（因为目前还没有新增硬盘的需求和经验，这里不做详细介绍）</span>

<span class="token function">fdisk</span> <span class="token parameter variable">-l</span> /dev/sdb <span class="token comment"># 表示查看该硬盘的分区状态</span>

mkfs.xfs /dev/sdb1 <span class="token comment"># 表示格式化分区，这个命令要慎用！</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/centos/lsblk.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="挂载目录" tabindex="-1"><a class="header-anchor" href="#挂载目录" aria-hidden="true">#</a> 挂载目录</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data/usb1 <span class="token comment"># mkdir -p命令创建data/usb1、data/usb2、data/usb3</span>

<span class="token function">mount</span> /dev/sdb1 data/usb1 <span class="token comment"># 临时挂载目录data/usb1 到分区sdb1下</span>

<span class="token function">mount</span> <span class="token comment"># 查看是否挂载成功</span>

<span class="token function">umount</span> data/usb1 <span class="token comment"># 取消临时目录挂载</span>

注意:以上都是临时挂载

blkid /dev/sdb1 <span class="token comment"># 查看文件系统uuid</span>

<span class="token function">vi</span> /etc/fstab <span class="token comment"># 修改分区表,格式如</span>
<span class="token assign-left variable">UUID</span><span class="token operator">=</span><span class="token string">"232e1a5f-65d2-4509-b446-99be7c2d6293"</span>  /root/data/usb1 xfs defaults <span class="token number">0</span> <span class="token number">0</span>
<span class="token comment"># 详解:[UUID] [挂载点] [文件系统] [文件系统参数] [dump] [fsck]</span>

<span class="token function">mount</span> <span class="token parameter variable">-a</span> <span class="token comment"># 检查是否挂载成功</span>

<span class="token function">df</span> / <span class="token comment"># 查看/挂载点</span>
<span class="token function">df</span> /home <span class="token comment"># 查看home的挂载点</span>

<span class="token function">umount</span> data/usb1 <span class="token comment"># 取消永久挂载</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分区扩容-常用小技能" tabindex="-1"><a class="header-anchor" href="#分区扩容-常用小技能" aria-hidden="true">#</a> 分区扩容（常用小技能）</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 例子: 从 cl-home 向 cl-root 扩容: 比如：root只有50G，home有900G</span>

<span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token comment"># 通过该命令查询有什么文件是挂载在cl-home下的，如果有需要先取消挂载，如图2</span>

<span class="token function">umount</span> /home <span class="token comment"># 取消挂载后才去做分区容量缩小</span>

<span class="token comment">#特别说明，/dev/cl/home 和 /dev/cl/root是指逻辑分区路径（和文件系统的命名不一样），查看命令为：</span>
lvdisplay

<span class="token comment"># 以下的三条命令的区别一定要注意，理论上只要运行其中之一就可以</span>
lvreduce <span class="token parameter variable">-L</span> 1G /dev/cl/home  <span class="token comment"># 将home分区减少到1G !!!!!</span>
lvreduce <span class="token parameter variable">-L</span> <span class="token parameter variable">-1G</span> /dev/cl/home  <span class="token comment"># 将home分区减少1G ！！！！</span>
lvextend <span class="token parameter variable">-l</span> +100%FREE /dev/cl/root <span class="token comment"># 将/home分区多出来的所有空闲空间都分配给root</span>


<span class="token comment"># 特别说明：linux 文件系统类型有两种：xfs和ext，这两种文件系统扩容的命令不太一样，且xfs是不支持减少</span>

<span class="token comment"># ext 文件系统实测命令：</span>
resize2fs /dev/mapper/centos-home            <span class="token comment">#执行调整</span>
<span class="token comment"># xfs 文件系统实测命令：</span>
xfs_growfs /dev/mapper/cl-root

<span class="token comment"># 最后，将/etc/fstab里的 /home挂载项取消掉！！！！</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/centos/mount_home.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


