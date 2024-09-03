---
title: Jenkins-slave部署
icon: circle-info
---

# Jenkins-slave部署
### Jenkins-slave部署



### 1、jenkins-slave 镜像构建及推送到私有镜像仓库(看情况选择是否需要用到)

jenkins-slave Dockerfile

```dockerfile
FROM centos:7
LABEL maintainer chenweiquan
RUN yum install -y java-1.8.0-openjdk maven curl git libtool-ltdl-devel && \
yum clean all && \
rm -rf /var/cache/yum/* && \
mkdir -p /usr/share/jenkins
COPY agent.jar /usr/share/jenkins/agent.jar
COPY jenkins-agent /usr/bin/jenkins-agent
COPY settings.xml /etc/maven/settings.xml
RUN chmod +x /usr/bin/jenkins-agent
COPY helm kubectl /usr/bin/
ENTRYPOINT ["jenkins-agent"]
```

注意制作这个镜像当前的目录空间下有以下文件：agent.jar,jenkins-agent,settings.xml,helm,kubectl
helm和kubectl需要走命令先查询再拷贝到当前目录

```shell
ps: 
agent.jar 下载 http://自己jenkins地址:端口/jnlpJars/agent.jar 
jenkins-agent 下载 https://github.com/jenkinsci/docker-inbound-agent/blob/master/jenkins-agent
settings.xml maven 配置文件

#当前目录：/usr/local/k8s/jenkins-slave/
cp -a /usr/local/bin/helm /usr/local/k8s/jenkins-slave/
cp -a /usr/local/bin/kubectl /usr/local/k8s/jenkins-slave/
chmod +x /usr/local/k8s/jenkins-slave/

制作镜像并上传到私服
docker build -t 192.168.10.249:85/iot/jenkins-slave-jdk:1.8 .

docker push 192.168.10.249:85/iot/jenkins-slave-jdk:1.8
```


### 2、jenkins中配置k8s 在Jenkins上配置kubernetes
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkinsk8scloud.png)

```text
安装jenkins 插件 kubernetes

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

```
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/k8scloud1.png)
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/k8scloud2.png)
至此 基本配置完成


### 3、jenkins中配置k8s相关信息
进入 jenkins --> 系统管理  --> clouds  --> new cloud  其他的按照需要配置

名称：任意
kubernetes地址：https://192.168.10.250:6443
kubernetes服务证书key：填/etc/kubernetes/pki/ca.crt内容
kubernetes命名空间：可指定
凭据：/etc/kubernetes/admin.conf
jenkins地址：http://192.168.10.250:8081
Pod Templates:
name: 自定义
label：同name
namespace：指定
container template:
name: jnlp
镜像：基于jnlp的镜像，可自己再包装一些需要的命令等


