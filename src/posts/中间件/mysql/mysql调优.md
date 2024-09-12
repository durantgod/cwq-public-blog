---
title: mysql 调优
icon: fire
category:
  - mysql
tag:
  - mysql 调优
---

## mysql调优
### 1、基础log日志开启

- 开启慢sql日志配置
  ```text
  [mysqld]
  # 慢查询开启：1  关闭：0
  
    slow_query_log = 1
  
    # 慢查询日志记录
    slow_query_log_file = /var/log/mysql/mysql-slow.log
  
    # 慢查询时间 一般10S， 这里0.1只是为了验证
    long_query_time = 0.1
  ```
  
- 查询慢sql是否开启等功能 命令
  ```shell
    # 查看慢sql是否开启及参数
    show variables like '%slow%';
    show variables like '%long_query%';
  ```

- binlog
  - 开启binlog日志功能 配置
    ```text
    # binlog 配置
    log-bin = /var/log/mysql/mysql-bin.log
  
    # 过期时间 3600 * 24 * 7, 默认是30天
    binlog_expire_logs_seconds = 604800
  
    # binlog最大容量 默认是 1G
    max_binlog_size = 500M

    # server-id 配置
    server-id = 1
    ```
  - 查看binlog 命令
    ```shell
    # mysql8 默认开启
      SHOW VARIABLES LIKE 'log_bin';
  
    # 查看现有在用的binlog日志
      SHOW master logs;
  
    # 手动清除binlog日志
     reset master;

    # 关闭binlog, mysql8默认开启的！
    vim /etc/my.cnf
    
    [mysqld]
    skip-log-bin
    
    # 查看binlog过期时间
    show variables like '%binlog_expire_logs_seconds%';
    ```
    ![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/mysql/mysql1.png)

### 2、buffer pool 等参数分析及设置

- buffer pool 设置建议机器内存60%
   ```text
      # 查询buffer pool大小, 默认为：128M， 显示默认为：134217728
      show variables like 'innodb_buffer_pool_size';
  
      # 设置缓冲区大小 默认是128M
      [mysqld]
        innodb_buffer_pool_size = 1G
  
      # 注意bufferpool的大小设置是否合理? 如果free buffer = 0，则设置过小
      show engine innodb status;
  
      # 如果值大于0，缓冲池也是设置过小
      show status like '%buffer_pool_wait%'
        
      # 查询缓冲区数据页大小
      show status like 'Innodb_buffer_pool_pages_data';
  
      # 查询缓冲区索引页大小
      show status like 'Innodb_buffer_pool_pages_index';
   ```
- buffer pool 不够或者满了会发生什么？
  - 使用LRU算法，将淘汰LRU链表尾部的页，如果这个被释放的页时脏页，就要强制执行checkpoint，将脏页刷新到磁盘。

- 主要组成：数据页、索引页、undo页、锁信息、自适应哈希索引、插入缓存、数据字典
  - 个人理解
    ![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/mysql/innodb1.png)
  - 网友理解
    ![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/mysql/innodb2.png)
  - 数据页中又分为脏页什么的，可以了解下：Free链表， Flush链表

### 3、普通参数的查询及调整
- 查看当前连接
  ```shell
   # 查看当前连接 查看长时间未释放的长链接
   show processlist;
  
   # 显示查询缓存，mysql8 之后去掉了
   show global status like 'QCache\_%';
  
  # 默认无数据交互后8小时后断开连接
  show global variables like 'wait_timeout';
  
  # 默认有数据交互的连接超时时长
  show global variables like 'interactive_timeout';
  
  # 查询服务器端和客户端在一次传送数据包的过程当中最大允许的数据包大小 默认64M
  show variables like 'max_allowed_packet';
  
  # 查询最大连接数，默认151
  show variables like 'max_connections';
  
  # 排序缓冲区，默认256k，即：262144，order by，group by 中间结果存储
  show variables like 'sort_buffer_size';
  
  # 读缓冲区，默认128K，即：131072, 如果读数据比较频繁，且维度多，建议调大该参数
  show variables like 'read_buffer_size';
  
  # 写缓冲区，默认8好像是去掉了  Doublewrite Buffer 双写缓冲区
  show variables like '%write_buffer_size%';
  
  # 查看表高速缓存设置
  show variables like '%table_open_cache%';
  ```
- 3层结构的B+树能存多少数据？
  计算公式：
  - 表table_a的id是主键索引，而id类型是bigint，一个bigint数据类型存储占8B，B+树指针占4B。如果使用率为100%，那么16KB的一个page可以大约存储1333个id索引，往下层分裂出1333个page。也就是，第二层最多可以使用13331333个id，数据量大约是177万，第三层，最多可以往下分裂出13331333(177万)个page，第三层大约能存储23.6亿数据。
