---
title: cpu飙升异常
icon: fire
category:
  - cpu
tag:
  - 病毒
---

### 1、以树状图形式显示所有进程 pstree
- -a 显示每个程序的完整指令，包含路径，参数或是常驻服务的标示
- -A 使用ASCII字符绘制树
- -c 如果有重覆的行程名, 则分开列出
- -G 使用VT100终端机的列绘图字符
- -h 列出树状图时，特别标明现在执行的程序
- -H -进程ID- 此参数的效果和指定”-h”参数类似，但特别标明指定的程序
- -g 显示PGID（进程组ID）。进程组ID以十进制数字的形式显示在每个进程名称后的括号中。如果同时显示PID和PGID，则首先显示PID
- -l 采用长列格式显示树状图
- -n 上下级进程按PID而不是按名称排序
- -N -type- 按命名空间类型排序（ipc、mnt、net、pid、user、uts）
- -p 显示PID。PID在每个进程名称后的括号中以十进制数字显示
- -s -pid- 显示指定进程的父进程
- -S 显示命名空间转换。与-N类似
- -u 显示用户名称
- -U 使用UTF-8（Unicode）线条绘制字符
- -V 显示版本
- -Z （SELinux）显示每个进程的安全上下文。仅当pstree使用SELinux支持编译时，此标志才有效


### 2、通过top命令查看异常的进程ID PID
```shell
# 通过ps 查看，并且显示父级进程
ps -l 1685

# 奇怪的是同样都是ps命令，有些能显示出docker 容器id，有些不能
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/bd/bd3.png)

![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/bd/bd1.png)

```shell
# 通过pstree 查看，并且显示关联的进程
# -s 显示1685及父级进程的关联关系，-p 显示出进程id
pstree  -s 1685 -p
```
![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/bd/bd2.png)

最后发现是 rocketmq 容器中引发的病毒cpu占用，应该是镜像有问题。最后换掉镜像重启服务解决了问题。