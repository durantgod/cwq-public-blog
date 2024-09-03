---
title: K8s之pvc
icon: fire
---


# K8s之pvc
### 官方解释
```text
PVC 的全称是：PersistentVolumeClaim（持久化卷声明），PVC 是用户存储的一种声明，
PVC 和 Pod 比较类似，Pod 消耗的是节点，PVC 消耗的是 PV 资源，Pod 可以请求 CPU 和内存，而 PVC 可以请求特定的存储空间和访问模式。
```

#### 1、PV是指K8S集群之间文件的映射，而文件挂载映射的底层使用NFS，所以第一步需要先安装NFS，在文件上传的服务器上先安装。

```shell
# 安装NFS
yum -y install nfs-utils

# 创建共享目录及目录权限
mkdir -p /usr/local/nfs/data/

chmod -R 777 /usr/local/nfs/data

# 修改对外暴露信息
vim /etc/exports

# 具体可以查找下nfs 安装方法
systemctl restart rpcbind && systemctl enable rpcbind
systemctl status rpcbind

# 验证是否成功安装nfs
showmount -e 192.168.10.250

```
#### 2、安装完后需要写pv 和 pvc的deployment文件 具体如下：
pv

```shell
apiVersion: v1
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
    server: 192.168.10.250
```

pvc

```shell
apiVersion: v1
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
```

#### 3、K8s中的deployment文件中的配置示例：
```shell
      # containers:
      #  - name: {{ .Values.appName }}
      #    image: "****"
          volumeMounts:
            - mountPath: "/usr/lib/pv" # 挂载目录
              name: nfs-pv
              
      # 设置对应的pvc      
      volumes:
        - name: nfs-pv
          persistentVolumeClaim:
            claimName: nfs-pvc2
```








