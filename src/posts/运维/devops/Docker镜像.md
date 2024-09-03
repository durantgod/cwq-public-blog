---
title: Docker镜像
icon: circle-info
---

# Docker镜像

### 1、具体的文件格式
Dockerfile标准格式如下：

```dockerfile
# 底座，可以理解为运行环境
FROM livingobjects/jre8

# 镜像作者
LABEL maintainer chenweiquan

# 创建构建目录，注意是容器内目录
RUN mkdir -p /hhd-link-iot-device/

# 复制文件到容器内目录
COPY ./hhd-link-iot-device/target/hhd-link-iot-device-1.0.0-SNAPSHOT.jar  /hhd-link-iot-device/

# 工作空间
WORKDIR /hhd-link-iot-device/

# 声明暴露端口
EXPOSE 8000

# 实际执行指令
CMD [ "sh", "-ec", "exec java ${JAVA_OPTS} -Xms1024m -Xmx2046m -Dfile.encoding=UTF-8 -Duser.timezone=GMT+08 -jar hhd-link-iot-device-1.0.0-SNAPSHOT.jar" ]

```

```text
ps: 如果怀疑镜像文件有问题，可以使用docker 相关命令查看内容
docker images

docker save -o image.tar image_name

tar -xvf image.tar

```



### 2、制作镜像，并且推送镜像到Harbor镜像仓库中

```shell
# 先登录私有镜像仓库 docker login -u ${username} -p ${password} ${registry}
docker login -u admin -p Harbor12345 192.168.10.249:85

# 在jar包所在目录下新建Dockerfile文件，配置如上信息，构建镜像：docker build  -t ImageName:TagName dir
docker build -t hhd-link-iot-device:v1.0.0-SNAPSHOT .

# 打tag  docker tag 镜像名:TAG harbor地址/项目/镜像名:TAG
docker tag hhd-link-iot-device:v1.0.0-SNAPSHOT 192.168.10.249:85/iot/hhd-link-iot-device:v1.0.0-SNAPSHOT

# 推送镜像到镜像仓库 docker push harbor地址/项目/镜像名:TAG
docker push 192.168.10.249:85/iot/hhd-link-iot-device:v1.0.0-SNAPSHOT

```

### 3、推送镜像到阿里云上
```shell
docker login --username=1881842*** -p 1****@ registry.cn-shenzhen.aliyuncs.com

docker build -t hhd-link-iot-data:v1.0.0-SNAPSHOT .

docker tag hhd-link-iot-data:v1.0.0-SNAPSHOT registry.cn-shenzhen.aliyuncs.com/sz_hhd/shenzhen_aliyun_harbor:hhd-link-iot-data-v1.0.0-SNAPSHOT
docker push registry.cn-shenzhen.aliyuncs.com/sz_hhd/shenzhen_aliyun_harbor:hhd-link-iot-data-v1.0.0-SNAPSHOT


```




