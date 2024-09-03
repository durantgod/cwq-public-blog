<template><div><h1 id="k8s之pvc" tabindex="-1"><a class="header-anchor" href="#k8s之pvc" aria-hidden="true">#</a> K8s之pvc</h1>
<h3 id="官方解释" tabindex="-1"><a class="header-anchor" href="#官方解释" aria-hidden="true">#</a> 官方解释</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PVC 的全称是：PersistentVolumeClaim（持久化卷声明），PVC 是用户存储的一种声明，
PVC 和 Pod 比较类似，Pod 消耗的是节点，PVC 消耗的是 PV 资源，Pod 可以请求 CPU 和内存，而 PVC 可以请求特定的存储空间和访问模式。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1、pv是指k8s集群之间文件的映射-而文件挂载映射的底层使用nfs-所以第一步需要先安装nfs-在文件上传的服务器上先安装。" tabindex="-1"><a class="header-anchor" href="#_1、pv是指k8s集群之间文件的映射-而文件挂载映射的底层使用nfs-所以第一步需要先安装nfs-在文件上传的服务器上先安装。" aria-hidden="true">#</a> 1、PV是指K8S集群之间文件的映射，而文件挂载映射的底层使用NFS，所以第一步需要先安装NFS，在文件上传的服务器上先安装。</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 安装NFS</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils

<span class="token comment"># 创建共享目录及目录权限</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/nfs/data/

<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /usr/local/nfs/data

<span class="token comment"># 修改对外暴露信息</span>
<span class="token function">vim</span> /etc/exports

<span class="token comment"># 具体可以查找下nfs 安装方法</span>
systemctl restart rpcbind <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> rpcbind
systemctl status rpcbind

<span class="token comment"># 验证是否成功安装nfs</span>
showmount <span class="token parameter variable">-e</span> <span class="token number">192.168</span>.10.250

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、安装完后需要写pv-和-pvc的deployment文件-具体如下" tabindex="-1"><a class="header-anchor" href="#_2、安装完后需要写pv-和-pvc的deployment文件-具体如下" aria-hidden="true">#</a> 2、安装完后需要写pv 和 pvc的deployment文件 具体如下：</h4>
<p>pv</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
  namespace: dev
  labels:
    pv: nfs-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Recycle
  storageClassName: nfs
  nfs:
    path: /usr/local/nfs/data
    server: <span class="token number">192.168</span>.10.250
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pvc</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc2
  namespace: dev
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: nfs
  selector:
    matchLabels:
      pv: nfs-pv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、k8s中的deployment文件中的配置示例" tabindex="-1"><a class="header-anchor" href="#_3、k8s中的deployment文件中的配置示例" aria-hidden="true">#</a> 3、K8s中的deployment文件中的配置示例：</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>      <span class="token comment"># containers:</span>
      <span class="token comment">#  - name: {{ .Values.appName }}</span>
      <span class="token comment">#    image: "****"</span>
          volumeMounts:
            - mountPath: <span class="token string">"/usr/lib/pv"</span> <span class="token comment"># 挂载目录</span>
              name: nfs-pv
              
      <span class="token comment"># 设置对应的pvc      </span>
      volumes:
        - name: nfs-pv
          persistentVolumeClaim:
            claimName: nfs-pvc2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


