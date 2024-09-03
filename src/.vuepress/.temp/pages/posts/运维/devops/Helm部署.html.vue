<template><div><h1 id="helm部署" tabindex="-1"><a class="header-anchor" href="#helm部署" aria-hidden="true">#</a> Helm部署</h1>
<h3 id="helm部署-1" tabindex="-1"><a class="header-anchor" href="#helm部署-1" aria-hidden="true">#</a> Helm部署</h3>
<h3 id="_1、搭建过程" tabindex="-1"><a class="header-anchor" href="#_1、搭建过程" aria-hidden="true">#</a> 1、搭建过程</h3>
<p>搭建篇主要介绍Helm，chart仓库chartmuseum 等环境的搭建。 Helm主要分为服务端Tiller和客户端,<br>
客户端负责Chart/Release应用创建和发布，服务端负责在K8S集群内运行创建容器等。</p>
<p>Helm搭建过程：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  <span class="token number">1</span>. 从 https://github.com/helm/helm/releases 下载 helm-v3.12.2-linux-amd64.tar.gz

  <span class="token number">2</span>. 解压
  <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> helm-v3.12.2-linux-amd64.tar.gz
    
  <span class="token number">3</span>. 移动
    <span class="token function">mv</span>  linux-amd64/helm  /usr/local/bin/helm 
    
  查看版本: helm version
    
  <span class="token number">4</span>. 仓库配置
    //添加常用的 chart 仓库
    helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
    helm repo <span class="token function">add</span> aliyun https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts
    helm repo <span class="token function">add</span> incubator https://charts.helm.sh/incubator 
     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、搭建chart仓库-chartmuseum" tabindex="-1"><a class="header-anchor" href="#_2、搭建chart仓库-chartmuseum" aria-hidden="true">#</a> 2、搭建chart仓库 Chartmuseum</h3>
<p>两种搭建方式，分别是docker 和 k8s搭建</p>
<p>Docker 搭建 Chartmuseum：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>docker run --rm -it \
  -p 8082:8080 \
  -e DEBUG=1 \
  -e STORAGE=local \
  -e STORAGE_LOCAL_ROOTDIR=/charts \
  -v $(pwd)/charts:/charts \
  ghcr.io/helm/chartmuseum:v0.14.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>k8s 搭建 Chartmuseum：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>apiVersion: apps/v1
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>chartmuseum 加入到Helm的仓库中：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> hhd-chart http://192.168.10.249:30012

<span class="token comment"># 更新仓库，如果不执行这个更新，后面加入的包不可见，接口无报错</span>
helm repo update

<span class="token comment"># 查看仓库列表:</span>
helm repo list 

<span class="token comment"># 创建Helm工程:</span>
helm create appwq

<span class="token comment"># 打包： 指定版本 0.1.1</span>
helm package appwq/ <span class="token parameter variable">--version</span> <span class="token number">0.1</span>.1

<span class="token comment"># 上传至chart仓库服务</span>
<span class="token function">curl</span> --data-binary <span class="token string">"@appwq-0.1.1.tgz"</span> http://192.168.10.249:30012/api/charts

<span class="token comment"># 查看</span>
helm search repo <span class="token operator">|</span><span class="token function">grep</span> appwq
                                                                                                                                                                                                                            
<span class="token comment"># 详情</span>
helm show chart appwq

<span class="token comment"># 移除仓库</span>
helm repo remove hhd-chart

<span class="token comment"># 推送部署到k8s</span>
helm <span class="token function">install</span> appwq hhd-chart/appwq

<span class="token comment"># 更新应用（修改完 appwq 配置后）</span>
helm upgrade appwq hhd-chart/appwq

<span class="token comment"># 查看当前Helm在k8s中已经部署的应用</span>
helm list --all-namespaces

<span class="token comment"># 卸载有Helm部署的应用</span>
helm uninstall  appwq

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、helm-是什么-helm中的chart和release-是什么概念" tabindex="-1"><a class="header-anchor" href="#_3、helm-是什么-helm中的chart和release-是什么概念" aria-hidden="true">#</a> 3、Helm 是什么？Helm中的chart和release 是什么概念？</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    Helm是k8s的包管理器，如 yum 之于 centos，pip 之于 python，npm 之于 javascript
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


