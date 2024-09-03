---
title: 离线搭建CDH6.2.0
icon: fire
---

### 1、搭建前规划

| 操作系统            | hostname | ip             | 角色  |
|-----------------|----------|----------------|-----|
| CentOS7.9(64位)  | master   | 192.168.10.249 | 主节点 |
| CentOS7.9(64位)  | slave01  | 192.168.10.253 | 从节点 |


### 2、搭建前的准备
#### 2.1、每个节点修改hostname，

```shell
# 192.168.10.249 执行
hostnamectl set-hostname master

#192.168.10.253上执行
hostnamectl set-hostname slave01

# 所有节点需要修改hosts文件
vim /etc/hosts

# 加入以下内容
192.168.10.249 master
192.168.10.250 slave01 
```

#### 2.2、关闭防火墙，安全认证selinux
```shell
systemctl stop firewalld && systemctl disable firewalld

# 修改selinux 为disabled 如：SELINUX=disabled
vi /etc/selinux/config
```

#### 2.3、各个节点之间免密登录

所有节点执行以下命令，在/root/.ssh/会生成id_rsa(私钥)和id_rsa.pub（公钥）

```shell
ssh-keygen -t rsa
```

所有服务节点将公钥复制到authorized_keys，并赋予authorized_keys600权限
```shell
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```
所有节点的authorized_keys复制汇总到master节点authorized_keys!! 然后复制 master 的 authorized_keys


#### 2.4、配置NTP服务（所有节点时间同步，目前部署的服务器时间都是一样的，所以跳过）


#### 2.5、 修改Linux swap 参数(所有节点）
```shell
# 临时修改swap为0
echo 0 > /proc/sys/vm/swappiness 

# 永久修改
vim /etc/sysctl.conf 加入
vm.swappiness=0

## 注意上述方法可能失败，centos5之前适用，centos7+如果不适用，可以尝试：
cd /usr/lib/tuned/

# 直接输入以下命令，然后把文件中的 swappiness 的都修改为0
grep "vm.swappiness" * -R
```

#### 2.6、禁用透明页(所有节点）
```shell
echo never > /sys/kernel/mm/transparent_hugepage/defrag
echo never >/sys/kernel/mm/transparent_hugepage/enabled

echo 'echo never > /sys/kernel/mm/transparent_hugepage/defrag' >> /etc/rc.local
echo 'echo never >/sys/kernel/mm/transparent_hugepage/enabled' >> /etc/rc.local
```

#### 2.7、配置jdk1.8,（所有节点）


#### 2.8、mysql-jdbc包（所有节点）
创建/usr/share/java目录，将mysql-jdbc包放过去（所有节点）
```shell
mkdir -p /usr/share/java

# 手动上传包，修改包名为：mysql-connector-java.jar
```

#### 2.9、Mysql安装（master节点）
```shell
# 卸载mariadb：rpm -qa|grep mariadb
rpm -e --nodeps mariadb-libs-5.5.60-1.el7_5.x86_64

# 删除依赖
yum remove mysql-libs

rpm -qa | grep  mysql


cd /opt/mysql/
tar -xvf ./mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar
rpm -ivh mysql-community-common-5.7.19-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-5.7.19-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-5.7.19-1.el7.x86_64.rpm

#之前需要安装
yum install net-tools
yum install libaio


rpm -ivh mysql-community-server-5.7.19-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-compat-5.7.19-1.el7.x86_64.rpm
# MYSQL配置:
mysqld --initialize --user=mysql # 初始化mysql使mysql目录的拥有者为mysql用户
cat /var/log/mysqld.log # 最后一行将会有随机生成的密码
systemctl start mysqld.service # 设置mysql服务自启
mysql -uroot –p 如果不能登陆
# 设置免密登录并重启mysql服务(先开启免密登陆,设置完密码以后,一定要注释了restart)
vi /etc/my.cnf

[mysqld]
skip-grant-tables


$>mysql -u root
mysql>use mysql;
mysql>update user set authentication_string = password('123456'), password_expired = 'N', password_last_changed = now() where user = 'root';
mysql>exit;

mysql -uroot -p123456

#创建数据库
CREATE DATABASE cmserver DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
GRANT ALL ON cmserver.* TO 'cmserver'@'%' IDENTIFIED BY 'Yyf5211314!'; 
CREATE DATABASE metastore DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
GRANT ALL ON metastore.* TO 'hive'@'%' IDENTIFIED BY 'Yyf5211314!'; 
CREATE DATABASE amon DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
GRANT ALL ON amon.* TO 'amon'@'%' IDENTIFIED BY 'Yyf5211314!'; 
CREATE DATABASE rman DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
GRANT ALL ON rman.* TO 'rman'@'%' IDENTIFIED BY 'Yyf5211314!'; 
CREATE DATABASE oozie DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
GRANT ALL ON oozie.* TO 'oozie'@'%' IDENTIFIED BY 'Yyf5211314!'; 
CREATE DATABASE hue DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
GRANT ALL ON hue.* TO 'hue'@'%' IDENTIFIED BY 'Yyf5211314!'; 
CREATE DATABASE nav DEFAULT CHARSET utf8 COLLATE utf8_general_ci; 
GRANT ALL ON nav.* TO 'nav'@'%' IDENTIFIED BY 'Yyf5211314!'; 
CREATE DATABASE navms DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
GRANT ALL ON navms.* TO 'navms'@'%' IDENTIFIED BY 'Yyf5211314!';


GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'pwd' WITH GRANT OPTION; 
flush privileges;

use mysql

select host, user from user; +-----------+---------------+ | host | user | +-----------+---------------+ | % | amon | | % | amonuser | | % | cmserver | | % | cmserveruser | | % | hive | | % | hiveuser | | % | hue | | % | hueuser | | % | nav | | % | navms | | % | oozie | | % | oozieuser | | % | rman | | % | rmanuser | | % | root | | % | sentry | | localhost | mysql.session | | localhost | mysql.sys | | localhost | root | +-----------+---------------+
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'IDENTIFIED BY '123456' WITH GRANT OPTION; 
FLUSH PRIVILEGES;

```

#### 2.10、安装Httpd服务（master节点）

```shell
yum install httpd
service httpd start
# 设置 HTTPD 服务开机自启, 主要作用是为3做cdh本地yum源下载使用
systemctl enable httpd.service
```

### 3、安装cdh相关服务
#### 3.1、配置Cloudera Manager包,配置本地yum源（master节点）
```shell
# 本来没有这文件的，需要新增，加入以下文件
vi /etc/yum.repos.d/cloudera-manager.repo

[cloudera-manager] 
name = Cloudera Manager, Version 
baseurl = http://master/cloudera-repos/cm6/ 
gpgcheck = 1
```
把以下的安装包放到服务器上，放上去之后，通过 http://master/cloudera-repos/cm6/ 访问到

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/cdh.png)

注意：repodata文件夹下需要走命令生成，而且走命令之前需要先去掉3.1配置文件 /etc/yum.repos.d/cloudera-manager.repo

createrepo .



#### 3.2、安装
```shell
yum clean all
yum makecache

# 导入GPG key（如果没有这步操作，很可能cloudera服务安装失败）master节点 
rpm --import http://master/cloudera-repos/cm6/RPM-GPG-KEY-cloudera
```

#### 3.3、安装 Cloudera Manager（master节点）
```shell
yum install cloudera-manager-daemons cloudera-manager-agent cloudera-manager-server

# 安装完CM后/opt/ 下会出现cloudera目录 将parcel包移动到指定位置
mv /opt/parcels/* /opt/cloudera/parcel-repo

# 在/opt/cloudera/parcel-repo执行以下命令：
sha1sum CDH-6.2.0-1.cdh6.2.0.p0.967373-el7.parcel | awk '{ print $1 }' > CDH-6.2.0-1.cdh6.2.0.p0.967373-el7.parcel.sha


# 执行初始化脚本:Yyf5211314!和上面设置的对应的数据库的密码保持一直
/opt/cloudera/cm/schema/scm_prepare_database.sh mysql cmserver cmserveruser Yyf5211314!

# 打开server服务:
systemctl restart cloudera-scm-agent
systemctl restart cloudera-scm-server


# 踩坑注意！jdk需要软连接到具体目录下
mkdir -p /usr/java
ln -s /usr/local/jdk/jdk1.8.0_281/ /usr/java/default

# 静候几分钟，打开http://master:7180
```


