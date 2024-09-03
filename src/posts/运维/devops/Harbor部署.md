---
title: Harbor部署
icon: circle-info
---

# Harbor部署
### Harbor部署

```shell
1、wget https://github.com/goharbor/harbor/releases/download/v2.8.0/harbor-offline-installer-v2.9.0.tgz

2、解压 tar zxvf harbor-offline-installer-v2.9.0.tgz -C /usr/local/harbor/

3、拷贝配置文件 cp /usr/local/harbor/harbor/harbor.yml.tmpl /usr/local/harbor/harbor/harbor.yml

4、修改配置文件 vim /opt/harbor/harbor.yml/usr/local/harbor/harbor/harbor.yml
修改hostname 和 port
注释https

5、启动
./prepare
./install.sh

ip:85
账号admin，密码Harbor12345

6、docker配置文件中配置仓库地址 /etc/docker/daemon.conf 中加入：

cat > /etc/docker/daemon.conf << EOF
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
    "insecure-registries": ["192.168.10.250:85"]
    }
EOF

7、修改docker 配置文件 vim  /usr/lib/systemd/system/docker.service

在ExecStart=/usr/bin/dockerd后面加：
--insecure-registry 192.168.10.250:85 \

8、重启docker
systemctl daemon-reload && systemctl restart docker







```





