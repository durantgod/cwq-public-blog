<template><div><h1 id="docker镜像" tabindex="-1"><a class="header-anchor" href="#docker镜像" aria-hidden="true">#</a> Docker镜像</h1>
<h3 id="_1、具体的文件格式" tabindex="-1"><a class="header-anchor" href="#_1、具体的文件格式" aria-hidden="true">#</a> 1、具体的文件格式</h3>
<p>Dockerfile标准格式如下：</p>
<div class="language-docker line-numbers-mode" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token comment"># 底座，可以理解为运行环境</span>
<span class="token instruction"><span class="token keyword">FROM</span> livingobjects/jre8</span>

<span class="token comment"># 镜像作者</span>
<span class="token instruction"><span class="token keyword">LABEL</span> maintainer chenweiquan</span>

<span class="token comment"># 创建构建目录，注意是容器内目录</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /hhd-link-iot-device/</span>

<span class="token comment"># 复制文件到容器内目录</span>
<span class="token instruction"><span class="token keyword">COPY</span> ./hhd-link-iot-device/target/hhd-link-iot-device-1.0.0-SNAPSHOT.jar  /hhd-link-iot-device/</span>

<span class="token comment"># 工作空间</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /hhd-link-iot-device/</span>

<span class="token comment"># 声明暴露端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8000</span>

<span class="token comment"># 实际执行指令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [ <span class="token string">"sh"</span>, <span class="token string">"-ec"</span>, <span class="token string">"exec java ${JAVA_OPTS} -Xms1024m -Xmx2046m -Dfile.encoding=UTF-8 -Duser.timezone=GMT+08 -jar hhd-link-iot-device-1.0.0-SNAPSHOT.jar"</span> ]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ps: 如果怀疑镜像文件有问题，可以使用docker 相关命令查看内容
docker images

docker save -o image.tar image_name

tar -xvf image.tar

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、制作镜像-并且推送镜像到harbor镜像仓库中" tabindex="-1"><a class="header-anchor" href="#_2、制作镜像-并且推送镜像到harbor镜像仓库中" aria-hidden="true">#</a> 2、制作镜像，并且推送镜像到Harbor镜像仓库中</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 先登录私有镜像仓库 docker login -u ${username} -p ${password} ${registry}</span>
<span class="token function">docker</span> login <span class="token parameter variable">-u</span> admin <span class="token parameter variable">-p</span> Harbor12345 <span class="token number">192.168</span>.10.249:85

<span class="token comment"># 在jar包所在目录下新建Dockerfile文件，配置如上信息，构建镜像：docker build  -t ImageName:TagName dir</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> hhd-link-iot-device:v1.0.0-SNAPSHOT <span class="token builtin class-name">.</span>

<span class="token comment"># 打tag  docker tag 镜像名:TAG harbor地址/项目/镜像名:TAG</span>
<span class="token function">docker</span> tag hhd-link-iot-device:v1.0.0-SNAPSHOT <span class="token number">192.168</span>.10.249:85/iot/hhd-link-iot-device:v1.0.0-SNAPSHOT

<span class="token comment"># 推送镜像到镜像仓库 docker push harbor地址/项目/镜像名:TAG</span>
<span class="token function">docker</span> push <span class="token number">192.168</span>.10.249:85/iot/hhd-link-iot-device:v1.0.0-SNAPSHOT

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、推送镜像到阿里云上" tabindex="-1"><a class="header-anchor" href="#_3、推送镜像到阿里云上" aria-hidden="true">#</a> 3、推送镜像到阿里云上</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login <span class="token parameter variable">--username</span><span class="token operator">=</span><span class="token number">1881842</span>*** <span class="token parameter variable">-p</span> <span class="token number">1</span>****@ registry.cn-shenzhen.aliyuncs.com

<span class="token function">docker</span> build <span class="token parameter variable">-t</span> hhd-link-iot-data:v1.0.0-SNAPSHOT <span class="token builtin class-name">.</span>

<span class="token function">docker</span> tag hhd-link-iot-data:v1.0.0-SNAPSHOT registry.cn-shenzhen.aliyuncs.com/sz_hhd/shenzhen_aliyun_harbor:hhd-link-iot-data-v1.0.0-SNAPSHOT
<span class="token function">docker</span> push registry.cn-shenzhen.aliyuncs.com/sz_hhd/shenzhen_aliyun_harbor:hhd-link-iot-data-v1.0.0-SNAPSHOT


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


