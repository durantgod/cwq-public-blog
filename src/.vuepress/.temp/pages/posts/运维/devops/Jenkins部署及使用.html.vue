<template><div><h1 id="jenkins部署及使用" tabindex="-1"><a class="header-anchor" href="#jenkins部署及使用" aria-hidden="true">#</a> Jenkins部署及使用</h1>
<h2 id="安装部署" tabindex="-1"><a class="header-anchor" href="#安装部署" aria-hidden="true">#</a> 安装部署</h2>
<p>基本要求：安装部署前需要先安装JDK1.8, git, maven, docker, docker-compose 等环境</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>    通过docker-compose方式安装jenkins， 好处是不需要关心 jenkins 的版本，需要的jdk,git,maven等插件都和物理机解耦
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本设置" tabindex="-1"><a class="header-anchor" href="#基本设置" aria-hidden="true">#</a> 基本设置</h2>
<h3 id="选择插件" tabindex="-1"><a class="header-anchor" href="#选择插件" aria-hidden="true">#</a> 选择插件</h3>
<p>输入jenkins启动时日志中输出的密码<br>
<img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkinscsmm.png" alt="" loading="lazy"></p>
<p>选择插件安装，一般进去已经有默认的了，直接点安装（等待过程10分钟等插件安装完成）<br>
<img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkinsplugins.png" alt="" loading="lazy"></p>
<h4 id="安装汉化插件-chinese-一般情况下上面已经安装了就无须再次安装" tabindex="-1"><a class="header-anchor" href="#安装汉化插件-chinese-一般情况下上面已经安装了就无须再次安装" aria-hidden="true">#</a> 安装汉化插件-chinese, 一般情况下上面已经安装了就无须再次安装</h4>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-chinese.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="配置公钥-需要在物理机上生成-执行命令" tabindex="-1"><a class="header-anchor" href="#配置公钥-需要在物理机上生成-执行命令" aria-hidden="true">#</a> 配置公钥，需要在物理机上生成：执行命令：</h4>
<pre><code>ssh-keygen -t rsa -P ''
cd /root/.ssh/
cat id_rsa

输出的内容复制到jenkins上，下面图片文字写错了公钥改为私钥, passphrase 指服务器用户名
</code></pre>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-ssh.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>接着配置ssh<br>
<img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-ssh-server.png" alt="" loading="lazy"></p>
<h4 id="配置多个ssh环境-如果验证不成功-有可能是因为jenkins版本太高-ssh需要的版本太高导致-所以需要" tabindex="-1"><a class="header-anchor" href="#配置多个ssh环境-如果验证不成功-有可能是因为jenkins版本太高-ssh需要的版本太高导致-所以需要" aria-hidden="true">#</a> 配置多个ssh环境，如果验证不成功，有可能是因为jenkins版本太高，ssh需要的版本太高导致，所以需要</h4>
<pre><code>#生成rsa密钥，回车
ssh-keygen -t rsa

#把公钥内容追加到认证文件中
cat id_rsa.pub &gt;&gt; authorized_keys
#授权
chmod 700 /root/.ssh
chmod 700 /root/.ssh/id_rsa
chmod 700 /root/.ssh/id_rsa.pub
chmod 600 authorized_keys
</code></pre>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-sshs.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="jenkins-系统配置-全局配置" tabindex="-1"><a class="header-anchor" href="#jenkins-系统配置-全局配置" aria-hidden="true">#</a> jenkins - 系统配置 - 全局配置</h3>
<p>maven</p>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-maven.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-maven-2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>注意settings.xml, 需要改一下 localRepository</p>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-maven-settings.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>git 配置</p>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-git.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="jenkins-创建项目" tabindex="-1"><a class="header-anchor" href="#jenkins-创建项目" aria-hidden="true">#</a> jenkins 创建项目</h3>
<p>参数设置<br>
<img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create.png" alt="" loading="lazy"></p>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-detail.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-git.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>maven 打包时跳过test模块打包：clean package -Dmaven.test.skip=true<br>
<img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-maven.png" alt="" loading="lazy"></p>
<p>最后配置构建后的流程，如图 ssh发送jar并且执行shell脚本：<br>
<img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/jenkins/jenkins-create-sshshell.png" alt="" loading="lazy"></p>
<pre><code>脚本内容如下，按实际项目修改里面的内容
. /etc/profile
source /etc/profile
BUILD_ID=dontKillMe
ps -ef | grep /home/usr/hhd-link-iot-device-1.0.0-SNAPSHOT.jar  |   grep -v   grep   |   awk '{printf $2}'  |  xargs kill -9
nohup java -jar /home/usr/hhd-link-iot-device-1.0.0-SNAPSHOT.jar &gt;iot-device.log &amp;2&gt;1 &amp;
</code></pre>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>遇到问题，最有效的解决部分是进入到jenkins容器内通过日志找到问题所在</p>
<p>docker exec -it 容器id bash</p>
</div></template>


