---
title: K8s问题篇
icon: circle-info
---


# K8s问题篇
### 所有遇到的问题集

#### 1、通过 docker login -u admin -p Harbor12345 192.168.10.249:85 登录不上镜像仓库，报错 Error response from daemon:Get "https://192.168.10.249:85/v2/": http: server gave HTTP response to HTTPS client
```text
1、在 /etc/docker/daemon.conf 中配置
{
    "registry-mirrors": [
    "https://jkgtnyi7.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
    ],
    "exec-opts": ["native.cgroupdriver=systemd"],
    "log-driver": "json-file",
    "log-opts": {
    "max-size": "100m"
    },
    "insecure-registries": ["192.168.10.249:85"] # 特别是这一行
 }
 
 重启docker,重新登录看看问题是否还存在？
 systemctl restart docker
 
 http: server gave HTTP response to HTTPS client 问题依旧存在
 
 
 执行命令：vim /usr/lib/systemd/system/docker.service
 
 需要修改的行：

ExecStart=/usr/bin/dockerd -H --insecure-registry 镜像地址 如：192.168.10.249:85

systemctl daemon-reload
systemctl restart docker

上面的两种方式只需要其中一种就行，亲测第二种有效
```







