---
title: Centos 网络故障分析
icon: fire
category:
  - Centos
tag:
  - Centos 网络
---

### 1、认识network和NetworkManager
先说结论，在CentOS系统中，network服务和NetworkManager是两个常用的网络管理工具，它们之间有一定的关系，但是也有区别：

```textmate
network：network服务是在CentOS 6及更早版本中使用的传统网络管理方式。它使用
/etc/sysconfig/network-scripts/目录下的配置文件来管理网络接口和网络设置。
通过编辑这些配置文件，您可以手动配置网络接口、IP地址、网关、DNS等网络参数。
network服务提供了较为底层的网络管理功能，适用于服务器环境或不需要频繁变动网络配置的情况。
```

```textmate
NetworkManager：NetworkManager是在CentOS 7及更新的版本中引入的新一代网络管理工具。
它提供了更高级的网络管理功能，并且支持动态配置和自动检测网络接口。NetworkManager可以
通过图形界面或命令行进行配置，并且支持各种网络连接类型，包括有线连接、Wi-Fi连接、
移动蜂窝数据连接等。NetworkManager通过/etc/NetworkManager/目录下的配置文件来管理网络设置。
```

虽然network服务和NetworkManager都可以用于配置网络，但它们之间存在一些差异。在CentOS系统中，默认情况下，NetworkManager会管理网络接口，而network服务会被禁用。如果您需要使用传统的network服务进行网络配置，可以通过停止和禁用NetworkManager服务，并启用network服务来实现。

### 2、故障分析
现象：服务器换了个路由器网络接口后报错，启动网卡失败。

#### 2.1 首先要学会分析启动失败问题定位
    service network start
    service NetworkManager stop

    systemctl disable NetworkManager # 禁用另一个网络管理器

    journalctl -xe # 如果这个过程命令失败了,一般可以看到失败原因


在目录：/etc/sysconfig/network-scripts/ 下修改ifcfg-eno1 内容
ps: 这里面的内容，如果是网口不对，显示的内容也会不一样。所以要正确配置。

```editorconfig
TYPE="Ethernet"
BOOTPROTO="none"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="eno1"
UUID="57b8cde2-73a0-493e-9d98-8473f42e33dd"
DEVICE="eno1"
ONBOOT="yes"
IPADDR="192.168.10.248"
PREFIX="24"
GATEWAY="192.168.10.254"
DNS1="192.168.10.254"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_PRIVACY="no"
NM_CONTROLLED="no"
#HWADDR="6c:0b:84:be:14:3c"
#hw="6c:0b:84:be:14:3c"
```
修改后启动：

ifconfig eno1 down

ifconfig eno1 up

最后重启：service network start