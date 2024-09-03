<template><div><h1 id="harbor部署" tabindex="-1"><a class="header-anchor" href="#harbor部署" aria-hidden="true">#</a> Harbor部署</h1>
<h3 id="harbor部署-1" tabindex="-1"><a class="header-anchor" href="#harbor部署-1" aria-hidden="true">#</a> Harbor部署</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">1</span>、wget https://github.com/goharbor/harbor/releases/download/v2.8.0/harbor-offline-installer-v2.9.0.tgz

<span class="token number">2</span>、解压 <span class="token function">tar</span> zxvf harbor-offline-installer-v2.9.0.tgz <span class="token parameter variable">-C</span> /usr/local/harbor/

<span class="token number">3</span>、拷贝配置文件 <span class="token function">cp</span> /usr/local/harbor/harbor/harbor.yml.tmpl /usr/local/harbor/harbor/harbor.yml

<span class="token number">4</span>、修改配置文件 <span class="token function">vim</span> /opt/harbor/harbor.yml/usr/local/harbor/harbor/harbor.yml
修改hostname 和 port
注释https

<span class="token number">5</span>、启动
./prepare
./install.sh

ip:85
账号admin，密码Harbor12345

<span class="token number">6</span>、docker配置文件中配置仓库地址 /etc/docker/daemon.conf 中加入：

<span class="token function">cat</span> <span class="token operator">></span> /etc/docker/daemon.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
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
EOF</span>

<span class="token number">7</span>、修改docker 配置文件 <span class="token function">vim</span>  /usr/lib/systemd/system/docker.service

在ExecStart<span class="token operator">=</span>/usr/bin/dockerd后面加：
--insecure-registry <span class="token number">192.168</span>.10.250:85 <span class="token punctuation">\</span>

<span class="token number">8</span>、重启docker
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl restart <span class="token function">docker</span>







</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


