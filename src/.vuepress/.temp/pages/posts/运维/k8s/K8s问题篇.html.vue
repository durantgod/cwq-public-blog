<template><div><h1 id="k8s问题篇" tabindex="-1"><a class="header-anchor" href="#k8s问题篇" aria-hidden="true">#</a> K8s问题篇</h1>
<h3 id="所有遇到的问题集" tabindex="-1"><a class="header-anchor" href="#所有遇到的问题集" aria-hidden="true">#</a> 所有遇到的问题集</h3>
<h4 id="_1、通过-docker-login-u-admin-p-harbor12345-192-168-10-249-85-登录不上镜像仓库-报错-error-response-from-daemon-get-https-192-168-10-249-85-v2-http-server-gave-http-response-to-https-client" tabindex="-1"><a class="header-anchor" href="#_1、通过-docker-login-u-admin-p-harbor12345-192-168-10-249-85-登录不上镜像仓库-报错-error-response-from-daemon-get-https-192-168-10-249-85-v2-http-server-gave-http-response-to-https-client" aria-hidden="true">#</a> 1、通过 docker login -u admin -p Harbor12345 192.168.10.249:85 登录不上镜像仓库，报错 Error response from daemon:Get &quot;<a href="https://192.168.10.249:85/v2/" target="_blank" rel="noopener noreferrer">https://192.168.10.249:85/v2/<ExternalLinkIcon/></a>&quot;: http: server gave HTTP response to HTTPS client</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1、在 /etc/docker/daemon.conf 中配置
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


