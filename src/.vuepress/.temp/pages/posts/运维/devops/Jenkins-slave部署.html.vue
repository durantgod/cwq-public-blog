<template><div><h1 id="jenkins-slave部署" tabindex="-1"><a class="header-anchor" href="#jenkins-slave部署" aria-hidden="true">#</a> Jenkins-slave部署</h1>
<h3 id="jenkins-slave部署-1" tabindex="-1"><a class="header-anchor" href="#jenkins-slave部署-1" aria-hidden="true">#</a> Jenkins-slave部署</h3>
<h3 id="_1、jenkins-slave-镜像构建及推送到私有镜像仓库-看情况选择是否需要用到" tabindex="-1"><a class="header-anchor" href="#_1、jenkins-slave-镜像构建及推送到私有镜像仓库-看情况选择是否需要用到" aria-hidden="true">#</a> 1、jenkins-slave 镜像构建及推送到私有镜像仓库(看情况选择是否需要用到)</h3>
<p>jenkins-slave Dockerfile</p>
<div class="language-docker line-numbers-mode" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> centos:7</span>
<span class="token instruction"><span class="token keyword">LABEL</span> maintainer chenweiquan</span>
<span class="token instruction"><span class="token keyword">RUN</span> yum install -y java-1.8.0-openjdk maven curl git libtool-ltdl-devel &amp;&amp; <span class="token operator">\</span>
yum clean all &amp;&amp; <span class="token operator">\</span>
rm -rf /var/cache/yum/* &amp;&amp; <span class="token operator">\</span>
mkdir -p /usr/share/jenkins</span>
<span class="token instruction"><span class="token keyword">COPY</span> agent.jar /usr/share/jenkins/agent.jar</span>
<span class="token instruction"><span class="token keyword">COPY</span> jenkins-agent /usr/bin/jenkins-agent</span>
<span class="token instruction"><span class="token keyword">COPY</span> settings.xml /etc/maven/settings.xml</span>
<span class="token instruction"><span class="token keyword">RUN</span> chmod +x /usr/bin/jenkins-agent</span>
<span class="token instruction"><span class="token keyword">COPY</span> helm kubectl /usr/bin/</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">"jenkins-agent"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意制作这个镜像当前的目录空间下有以下文件：agent.jar,jenkins-agent,settings.xml,helm,kubectl<br>
helm和kubectl需要走命令先查询再拷贝到当前目录</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ps: 
agent.jar 下载 http://自己jenkins地址:端口/jnlpJars/agent.jar 
jenkins-agent 下载 https://github.com/jenkinsci/docker-inbound-agent/blob/master/jenkins-agent
settings.xml maven 配置文件

<span class="token comment">#当前目录：/usr/local/k8s/jenkins-slave/</span>
<span class="token function">cp</span> <span class="token parameter variable">-a</span> /usr/local/bin/helm /usr/local/k8s/jenkins-slave/
<span class="token function">cp</span> <span class="token parameter variable">-a</span> /usr/local/bin/kubectl /usr/local/k8s/jenkins-slave/
<span class="token function">chmod</span> +x /usr/local/k8s/jenkins-slave/

制作镜像并上传到私服
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.10.249:85/iot/jenkins-slave-jdk:1.8 <span class="token builtin class-name">.</span>

<span class="token function">docker</span> push <span class="token number">192.168</span>.10.249:85/iot/jenkins-slave-jdk:1.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、jenkins中配置k8s-在jenkins上配置kubernetes" tabindex="-1"><a class="header-anchor" href="#_2、jenkins中配置k8s-在jenkins上配置kubernetes" aria-hidden="true">#</a> 2、jenkins中配置k8s 在Jenkins上配置kubernetes</h3>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkinsk8scloud.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>安装jenkins 插件 kubernetes

查看 kubectl 配置 
cat /root/.kube/config 如上图所示，把对应的内容拷贝到文件然后转换成配置文件

注意：这里，
将certificate-authority-data的内容保存到certificate-authority-data文件
将client-certificate-data的内容保存到client-certificate-data文件
将client-key-data的内容保存到client-key-data文件

vim certificate-authority-data
vim client-certificate-data
vim client-key-data

cat certificate-authority-data | base64 -d > ca.crt
cat client-certificate-data | base64 -d > client.crt
cat client-key-data | base64 -d > client.key

生成证书
openssl pkcs12 -export -out cert.pfx -inkey client.key -in client.crt -certfile ca.crt

输入密码：123456 # 备用

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/k8scloud1.png" alt="" loading="lazy"><br>
<img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/k8scloud2.png" alt="" loading="lazy"><br>
至此 基本配置完成</p>
<h3 id="_3、jenkins中配置k8s相关信息" tabindex="-1"><a class="header-anchor" href="#_3、jenkins中配置k8s相关信息" aria-hidden="true">#</a> 3、jenkins中配置k8s相关信息</h3>
<p>进入 jenkins --&gt; 系统管理  --&gt; clouds  --&gt; new cloud  其他的按照需要配置</p>
<p>名称：任意<br>
kubernetes地址：<a href="https://192.168.10.250:6443" target="_blank" rel="noopener noreferrer">https://192.168.10.250:6443<ExternalLinkIcon/></a><br>
kubernetes服务证书key：填/etc/kubernetes/pki/ca.crt内容<br>
kubernetes命名空间：可指定<br>
凭据：/etc/kubernetes/admin.conf<br>
jenkins地址：<a href="http://192.168.10.250:8081" target="_blank" rel="noopener noreferrer">http://192.168.10.250:8081<ExternalLinkIcon/></a><br>
Pod Templates:<br>
name: 自定义<br>
label：同name<br>
namespace：指定<br>
container template:<br>
name: jnlp<br>
镜像：基于jnlp的镜像，可自己再包装一些需要的命令等</p>
</div></template>


