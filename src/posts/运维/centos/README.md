---
title: centos
icon: lightbulb
---

### centos 系统磁盘，分区，逻辑分区等小常识

```shell
lsblk # 查看所有的存储设备，包括硬盘，扩展硬盘

#一般情况下, 存在sda,sdb两块硬盘, 如下图1所示有sda硬盘, 和两个逻辑分区cl-home,cl-root

fdisk /dev/sdb # 表示对硬盘sdb进行分区（因为目前还没有新增硬盘的需求和经验，这里不做详细介绍）

fdisk -l /dev/sdb # 表示查看该硬盘的分区状态

mkfs.xfs /dev/sdb1 # 表示格式化分区，这个命令要慎用！

```
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/centos/lsblk.png)



### 挂载目录
```shell
mkdir -p data/usb1 # mkdir -p命令创建data/usb1、data/usb2、data/usb3

mount /dev/sdb1 data/usb1 # 临时挂载目录data/usb1 到分区sdb1下

mount # 查看是否挂载成功

umount data/usb1 # 取消临时目录挂载

注意:以上都是临时挂载

blkid /dev/sdb1 # 查看文件系统uuid

vi /etc/fstab # 修改分区表,格式如
UUID="232e1a5f-65d2-4509-b446-99be7c2d6293"  /root/data/usb1 xfs defaults 0 0
# 详解:[UUID] [挂载点] [文件系统] [文件系统参数] [dump] [fsck]

mount -a # 检查是否挂载成功

df / # 查看/挂载点
df /home # 查看home的挂载点

umount data/usb1 # 取消永久挂载

```

### 分区扩容（常用小技能）
```shell
# 例子: 从 cl-home 向 cl-root 扩容: 比如：root只有50G，home有900G

df -h # 通过该命令查询有什么文件是挂载在cl-home下的，如果有需要先取消挂载，如图2

umount /home # 取消挂载后才去做分区容量缩小

#特别说明，/dev/cl/home 和 /dev/cl/root是指逻辑分区路径（和文件系统的命名不一样），查看命令为：
lvdisplay

# 以下的三条命令的区别一定要注意，理论上只要运行其中之一就可以
lvreduce -L 1G /dev/cl/home  # 将home分区减少到1G !!!!!
lvreduce -L -1G /dev/cl/home  # 将home分区减少1G ！！！！
lvextend -l +100%FREE /dev/cl/root # 将/home分区多出来的所有空闲空间都分配给root


# 特别说明：linux 文件系统类型有两种：xfs和ext，这两种文件系统扩容的命令不太一样，且xfs是不支持减少

# ext 文件系统实测命令：
resize2fs /dev/mapper/centos-home            #执行调整
# xfs 文件系统实测命令：
xfs_growfs /dev/mapper/cl-root

# 最后，将/etc/fstab里的 /home挂载项取消掉！！！！

```
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/centos/mount_home.png)
