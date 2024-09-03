---
title: Jenkins部署及使用
icon: circle-info
---


# Jenkins部署及使用


## 安装部署

 基本要求：安装部署前需要先安装JDK1.8, git, maven, docker, docker-compose 等环境

```xml
    通过docker-compose方式安装jenkins， 好处是不需要关心 jenkins 的版本，需要的jdk,git,maven等插件都和物理机解耦
    另一个原因是 jenkins 只有最新的几个版本才支持在线安装插件，如果用低级传统的部署方式，必须要找到离线安装需要的所有插件
    才能正常使用。

    docker-compose.yml 内容如下：（注意：maven/jdk/git等路径的映射要和物理机的路径要对应）
        
    version: '3.8'
    services:
     docker_jekins_2.378:
      image: jenkins/jenkins:2.378-jdk11
      container_name: docker_jekins_2.378
      user: root
      ports:
        - "8081:8080"
      expose:
        - "50000"
        - "8080"
      privileged: true
      restart: unless-stopped
      volumes:
        - ./jenkins_data:/var/jenkins_home
        - /usr/local/maven/apache-maven-3.6.3:/usr/local/mymaven
        - /usr/local/java/jdk1.8.0_281:/usr/local/jdk
        - /usr/bin/git:/usr/local/git

```

## 基本设置
### 选择插件
输入jenkins启动时日志中输出的密码
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkinscsmm.png)

选择插件安装，一般进去已经有默认的了，直接点安装（等待过程10分钟等插件安装完成）
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkinsplugins.png)


#### 安装汉化插件-chinese, 一般情况下上面已经安装了就无须再次安装
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-chinese.png)


#### 配置公钥，需要在物理机上生成：执行命令：
    ssh-keygen -t rsa -P ''
    cd /root/.ssh/
    cat id_rsa

    输出的内容复制到jenkins上，下面图片文字写错了公钥改为私钥, passphrase 指服务器用户名
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-ssh.png)

接着配置ssh
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-ssh-server.png)


#### 配置多个ssh环境，如果验证不成功，有可能是因为jenkins版本太高，ssh需要的版本太高导致，所以需要
    #生成rsa密钥，回车
    ssh-keygen -t rsa
    
    #把公钥内容追加到认证文件中
    cat id_rsa.pub >> authorized_keys
    #授权
    chmod 700 /root/.ssh
    chmod 700 /root/.ssh/id_rsa
    chmod 700 /root/.ssh/id_rsa.pub
    chmod 600 authorized_keys
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-sshs.png)



### jenkins - 系统配置 - 全局配置
maven

![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-maven.png)

![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-maven-2.png)

注意settings.xml, 需要改一下 localRepository

![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-maven-settings.png)


git 配置

![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-git.png)


### jenkins 创建项目

参数设置
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create.png)

![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-detail.png)

![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-git.png)

maven 打包时跳过test模块打包：clean package -Dmaven.test.skip=true
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-maven.png)

最后配置构建后的流程，如图 ssh发送jar并且执行shell脚本：
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-sshshell.png)


    脚本内容如下，按实际项目修改里面的内容
    . /etc/profile
    source /etc/profile
    BUILD_ID=dontKillMe
    ps -ef | grep /home/usr/hhd-link-iot-device-1.0.0-SNAPSHOT.jar  |   grep -v   grep   |   awk '{printf $2}'  |  xargs kill -9
    nohup java -jar /home/usr/hhd-link-iot-device-1.0.0-SNAPSHOT.jar >iot-device.log &2>1 &

## 总结
遇到问题，最有效的解决部分是进入到jenkins容器内通过日志找到问题所在 
        
docker exec -it 容器id bash