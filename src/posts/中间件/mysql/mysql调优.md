---
title: mysql 调优
icon: fire
category:
  - mysqll
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

    # 关闭binlog
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
   ```

- 主要组成：数据页、索引页、undo页、锁信息、自适应哈希索引、插入缓存、数据字典
  - 个人理解
    ![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/mysql/innodb1.png)
  - 网友理解
    ![](https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/mysql/innodb2.png)
  