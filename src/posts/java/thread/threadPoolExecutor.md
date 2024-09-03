---
title: ThreadPoolExecutor
icon: fire
category:
  - java
tag:
  - 线程
---
##  线程池

### 1、创建线程池，创建线程池有必填的几个参数

    核心线程数，最大线程数，存活时间，单位，阻塞队列
    线程池执行线程的大概过程如下：
    1、创建线程池，但是未创建线程，核心线程和非核心线程都是懒加载
    2、当核心线程数满了之后，任务会进入到阻塞队列中等待被执行
    3、当阻塞队列满了之后，会创建非核心线程执行任务。

验证过程如下：

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/java/threadPoolCreateDemo.png)

github源码地址：https://github.com/chenweiquan-red/cwq-public-knowledge

疑问点：
- 1、当核心线程数满，阻塞队列满之后，创建的非核心线程执行任务。那么当阻塞队列的任务会被那个线程消费？后续的任务是否会直接被执行还是存放在阻塞队列中？
- 2、阻塞队列一般使用LinkedBlockingQueue？还是怎么优化？

### 2、手动实现阻塞队列功能

待完成...



### 3、手动实现线程池功能
待完成...



