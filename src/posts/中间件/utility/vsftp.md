---
title: vsftp搭建
icon: fire
category:
 - utility
tag:
 - 文档
---

### vsftp 简单介绍

#### vsftp 有三种用户模式

```shell
# 首先安装ftp环境
yum install vsftpd
```

::: tabs
@tab:active  匿名用户模式

```text
vim /etc/vsftpd/vsftpd.conf
```

```shell
anon_root=/var/www/
anon_upload_enable=YES
anon_mkdir_write_enable=YES
anon_other_write_enable=YES
anon_umask=022
```
缺点：安全性很差，只要知道IP都能登录ftp

@tab 本地用户模式
```text
vim /etc/vsftpd/vsftpd.conf
```

禁用匿名模式
```shell
#禁用匿名模式
anonymous_enable=NO

#限制用从/var/www/html切换到上一级目录
chroot_local_user=YES

#指定用户登陆后的默认目录
local_root=/var/www/html

#设置启用用户不能切换目录后的上传,删除,改名等权限
allow_writeable_chroot=YES
```

```shell
# 新建本地用户并设置密码

#加 -s /sbin/nologin意思是该用户不能以系统用户身份登陆到centos系统中,只能作为ftp的用户登陆到ftp用
useradd -s /sbin/nologin hhdlink001
echo "hhdlink001:hhdlink001@ftp" |chpasswd

# 设置/var/www/html 目录写入权限
chmod o+w /var/www/html -R
```


@tab 虚拟用户模式
安装pam认证方式

```shell
# 安装pam认证方式
yum -y install pam pam-devel
```

```shell
# 添加虚拟用户映射的本地用户
useradd -s /sbin/nologin virftp
echo "virftp:123" |chpasswd
```

```shell
# 修改配置文件
vim /etc/vsftpd/vsftpd.conf
```

```shell
write_enable=YES
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
```

添加虚拟用户
```shell
vim /etc/vsftpd/vir_user  #奇数行为账号,偶数行为密码

			
hhdlink001
hhdlink001@ftp
```

创建虚拟用户数据库
```shell
db_load -T -t hash -f /etc/vsftpd/vir_user  /etc/vsftpd/vir_user.db
```

修改数据库权限属主权限
```shell
chmod 700 /etc/vsftpd/vir_user.db
```

配置pam验证文件
```shell
cp /etc/pam.d/vsftpd{,.bak}
vim /etc/pam.d/vsftpd
```

将auth及account的所有配置行均注释掉，再添加如下两行
```shell
auth       required     pam_userdb.so   db=/etc/vsftpd/vir_user  
account    required     pam_userdb.so   db=/etc/vsftpd/vir_user
```

单独配置虚拟用户的权限
```shell
mkdir /etc/vsftpd/vsftpd_virusers/
vim /etc/vsftpd/vsftpd_virusers/hhdlink001
```

```shell
anon_upload_enable=YES
anon_mkdir_write_enable=YES
anon_other_write_enable=YES
anon_umask=022
local_root=/var/www/html
allow_writeable_chroot=YES
chroot_local_user=YES
```

设置 /var/www/html写入权限
```shell
chmod o+w /var/www/html -R
```
:::

注意： 
1、如果登录失败！提示：500 OOPS: cannot locate user entry:vsftpd
```shell
groupadd vsftpd 
adduser -g vsftpd -s /sbin/nologin vsftpd 
systemctl restart vsftpd
```

2、如果上传文件失败
```shell
setsebool allow_ftpd_full_access on
```

3、如果新增虚拟用户失败，提示：
db_load: BDB5090 unexpected end of input data or key/data pair 
db_load: BDB5079 odd number of key/data pairs

可以在虚拟用户列表最后加回车

完整的vsftpd.conf
```text
write_enable=YES
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

```

