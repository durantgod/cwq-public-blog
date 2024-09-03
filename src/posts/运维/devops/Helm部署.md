---
title: Helm部署
icon: circle-info
---

# Helm部署
### Helm部署

### 1、搭建过程
搭建篇主要介绍Helm，chart仓库chartmuseum 等环境的搭建。 Helm主要分为服务端Tiller和客户端,
客户端负责Chart/Release应用创建和发布，服务端负责在K8S集群内运行创建容器等。

Helm搭建过程：

```shell
  1. 从 https://github.com/helm/helm/releases 下载 helm-v3.12.2-linux-amd64.tar.gz

  2. 解压
  tar -zxvf helm-v3.12.2-linux-amd64.tar.gz
    
  3. 移动
    mv  linux-amd64/helm  /usr/local/bin/helm 
    
  查看版本: helm version
    
  4. 仓库配置
    //添加常用的 chart 仓库
    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm repo add aliyun https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts
    helm repo add incubator https://charts.helm.sh/incubator 
     
```


### 2、搭建chart仓库 Chartmuseum
两种搭建方式，分别是docker 和 k8s搭建

Docker 搭建 Chartmuseum：

```
docker run --rm -it \
  -p 8082:8080 \
  -e DEBUG=1 \
  -e STORAGE=local \
  -e STORAGE_LOCAL_ROOTDIR=/charts \
  -v $(pwd)/charts:/charts \
  ghcr.io/helm/chartmuseum:v0.14.0
```


k8s 搭建 Chartmuseum：

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: chartmuseum
  name: chartmuseum
  namespace: kube-system
spec:
  replicas: 2
  selector:
    matchLabels:
      app: chartmuseum
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: chartmuseum
    spec:
      containers:
      - image: chartmuseum/chartmuseum:latest
        imagePullPolicy: IfNotPresent
        name: chartmuseum
        ports:
        - containerPort: 8080
          protocol: TCP
        env:
        - name: DEBUG
          value: "1"
        - name: STORAGE
          value: local
        - name: STORAGE_LOCAL_ROOTDIR
          value: /charts
        resources:
          limits:
            cpu: 500m
            memory: 256Mi
          requests:
            cpu: 100m
            memory: 64Mi
        volumeMounts:
        - mountPath: /charts
          name: charts-volume
      volumes:
      - name: charts-volume
      restartPolicy: Always



--- 

apiVersion: v1
kind: Service
metadata:
  name: chartmuseum
  namespace: kube-system
spec:
  ports:
    - port: 8080 
      protocol: TCP
      targetPort: 8080 
      nodePort: 30012 # 指定nodeport端口，不指定会随机生成
  selector:
    app: chartmuseum
  type: NodePort
```

chartmuseum 加入到Helm的仓库中：
```shell
helm repo add hhd-chart http://192.168.10.249:30012

# 更新仓库，如果不执行这个更新，后面加入的包不可见，接口无报错
helm repo update

# 查看仓库列表:
helm repo list 

# 创建Helm工程:
helm create appwq

# 打包： 指定版本 0.1.1
helm package appwq/ --version 0.1.1

# 上传至chart仓库服务
curl --data-binary "@appwq-0.1.1.tgz" http://192.168.10.249:30012/api/charts

# 查看
helm search repo |grep appwq
                                                                                                                                                                                                                            
# 详情
helm show chart appwq

# 移除仓库
helm repo remove hhd-chart

# 推送部署到k8s
helm install appwq hhd-chart/appwq

# 更新应用（修改完 appwq 配置后）
helm upgrade appwq hhd-chart/appwq

# 查看当前Helm在k8s中已经部署的应用
helm list --all-namespaces

# 卸载有Helm部署的应用
helm uninstall  appwq

```


### 3、Helm 是什么？Helm中的chart和release 是什么概念？

```text
    Helm是k8s的包管理器，如 yum 之于 centos，pip 之于 python，npm 之于 javascript
    当一个 Chart 部署后生成一个 release，chart/relase 类似于 docker 中 image/container
    
    chart的目录结构如下：
    .
    ├── charts
    ├── templates
    │  ├── tests
    │  │ └── test-connection.yaml
    │  ├── deployment.yaml
    │  ├── _helpers.tpl
    │  ├── hpa.yaml
    │  ├── ingress.yaml
    │  ├── NOTES.txt
    │  ├── serviceaccount.yaml
    │  └── service.yaml
    ├── Chart.yaml
    └── values.yaml
    
    解读：
    values.yaml: 这是可选参数
    templates/: 这是配置文件模板
```