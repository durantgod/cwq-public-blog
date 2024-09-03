---
title: Hbase 入门
icon: fire

category:
  - 大数据
tag:
  - hbase,nosql
---

# Hbase 简单介绍


```shell
# hbase常用命令
 create_namespace  '**' # 创建命名空间
 drop_namespace '**' # 删除命名空间
 list_namespace  # 查询所有命名空间
 list_namespace_tables '**'  # 查看命名空间下的表
 
 create 'wquser', 'info', 'data' # 创建表
 create 'wq:wquser1', 'info', 'data' # 创建命名空间下的表
 put 'wquser', 'tom', '22age' # 插入数据
 put 'user', 'rk0001', 'info:name'
 
 
  create 'SYSTEM:wquser2', 'info', 'data'
```