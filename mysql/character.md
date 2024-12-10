# 修改mysql默认字符集

## 一、首先我们修改my.cnf参数

```bash
[client]
default-character-set=utf8mb4
  
[mysql]
default-character-set=utf8mb4

[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect = 'SET NAMES utf8mb4'
character-set-client-handshake = false
```

## 二、对数据库相关的表进行字符集修改

将数据库转换为utf8mb4

```sql
mysql> ALTER DATABASE erp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

将已经建好的表也转换成utf8mb4 

```sql
mysql>ALTER TABLE `erp_comment` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

将需要使用emoji的字段设置类型为： 

```sql
mysql>ALTER TABLE `erp_comment` MODIFY COLUMN `comment`  varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 三、重启数据库服务器使之生效

```bash
[root@HE3 ~]# /etc/init.d/mysqld restart
Shutting down MySQL.. SUCCESS! 
Starting MySQL.... SUCCESS!
```

## 四、登录数据库检查是否如下

```sql
mysql> SHOW VARIABLES WHERE Variable_name LIKE 'character%' OR Variable_name LIKE 'collation%';
+--------------------------+--------------------+
| Variable_name            | Value              |
+--------------------------+--------------------+
| character_set_client    | utf8mb4            |
| character_set_connection | utf8mb4            |
| character_set_database  | utf8mb4            |
| character_set_filesystem | binary            |
| character_set_results    | utf8mb4            |
| character_set_server    | utf8mb4            |
| character_set_system    | utf8              |
| collation_connection    | utf8mb4_unicode_ci |
| collation_database      | utf8mb4_unicode_ci |
| collation_server        | utf8mb4_unicode_ci |
+--------------------------+--------------------+
rows in set (0.00 sec)
```

特别说明下：collation_connection/collation_database/collation_server如果是utf8mb4_general_ci，没有关系。但必须保证character_set_client/character_set_connection/character_set_database/character_set_results/character_set_server为utf8mb4。


**五：让开发那边的pom配置中，去掉characterEncoding参数，并重新编译一下**

如果你用的是java服务器，升级或确保你的mysql connector版本高于5.1.13，否则仍然无法使用utf8mb4


**最后再让前端应用插入emoji表情，就可以了。**

**一些小知识点:**

其中character-set-server 和 collation-server 这些设置为utf8mb4字符集是比较容易理解的，就是将MySQL数据库相关的字符集都设置为utf8mb4；

但为了实现客户端utf8连接到MySQL后，使用的也是utf8mb4字符集，就在 mysqld配置中配置了 init_connect='SET NAMES utf8mb4' 表示初始化连接都设置为utf8mb4字符集，再配置一个 skip-character-set-client-handshake = true 忽略客户端字符集设置，不论客户端是何种字符集，都按照init_connect中的设置进行使用，这样就满足了应用的需求。