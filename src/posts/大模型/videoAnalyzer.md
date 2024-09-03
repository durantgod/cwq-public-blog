---
title: 视频识别项目
icon: fire
category:
    - 大模型
tag:
    - yolo
---
## 视频识别项目

### 1、大体结构主要可以分为四个部分，管理端，分析端，yoloV5端，ffmpeg推流端
大体结构图如下：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/yolo.svg)

### 2、管理端，主要功能是视频管理、算法管理、布控管理
首先项目使用的python版本是3.10，所以提前准备好环境。
```shell
# 创建虚拟环境
python -m venv venv

# 切换到虚拟环境
venv\Scripts\activate

# 更新虚拟环境的pip版本
python -m pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple

# 在虚拟环境中安装依赖库
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```
项目地址：https://github.com/chenweiquan-red/cwq-public-video-admin.git

启动后的展示：
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/videoadmin.png)

### 3、模型分析端pytorch

项目地址：https://github.com/chenweiquan-red/cwq-public-video-pytorch.git


### 4、分析器，目前是非源码阶段，后续补充
夸克网盘：https://pan.quark.cn/s/241663b61805 提取码：6MXu

ps: 这里是所有打包好的，包括前三步骤，如果执行了前三个步骤，这里可以只跑 VideoAnalyzer.exe
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/vide04.png)


### 5、推流端
跑第四步data中的bat

未完待定.....

