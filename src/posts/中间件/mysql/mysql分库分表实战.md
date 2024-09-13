---
title: 分库分表
icon: fire
category:
  - mysql
tag:
  - mysql 分库分表
---

## mysql分库分表
### 1、简单理论
- 1、分库分表主要有两种方式：垂直分表和水平分表。
  - 水平分表
    - 优点：解决单表量大问题，业务侧简单不需要修改 
    - 缺点：分片事务一致性，跨库多表联查，水平扩展需要变更所有的分表
  - 垂直分表
    - 优点：业务清晰，逻辑清晰
    - 缺点：单表量大问题还是难以解决。

  
### 2、中间件，shardingSphere 分库分表，之sharding-jdbc
官网地址：https://shardingsphere.apache.org/

#### 2.1、数据表概念
- 表概念，分为逻辑表，真实表，绑定表，广播表和单表
- 数据节点，数据分片的最小单元，由数据源名称和真实表组成。 例：ds_0.t_order_0
- 分片，是指将数据分片到多个数据节点上，例如：ds_0.t_order_0，ds_1.t_order_1。
  - 分片键，sharding key，例如：order_id.,如果sql中没有分片键，将会走全路由。效率极低
  - 分片算法，例如：hash，range，range_between，支持 =、>=、<=、>、<、BETWEEN 和 IN 进行分片
  - 自定义分片算法，实际情况是根据多个字段作为分片键，例如：order_id,user_id
    - 标准分片算法，唯一键作为分片键
    - 复合分片算法，多个键作为分片键
    - Hint 分片算法，Hint 行分片的场景（实际并没有这个字段？）
  - 分片策略，分片算法+分片键
  - 行表达式，主要是简化配置，如：${begin..end} 表示范围区间
  - 分布式主键，高位到低位分表为：1bit 符号位、41bit 时间戳位、10bit 工作进程位以及 12bit 序列号位

#### 2.2、使用规范，分页，事务
- SQL使用规范，编写规范，有些函数等不支持分片策略
- 分页，sql自身如果分页偏移量过大，就会导致查询性能缓慢，shardingSphere 做过优化
- 分布式事务，XA,柔性事务
- 读写分离，具体请看：https://shardingsphere.apache.org/document/5.1.2/cn/features/readwrite-splitting/use-norms/
- 压测
- 数据加密
- 弹性伸缩

#### 2.3、


### 3、实战



