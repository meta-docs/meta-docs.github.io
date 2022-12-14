# MySQL FAQ

## MySQL int(X) 中 X 的含义
这个可选的宽度规格说明是用于在数值显示时，对某些值的宽度短于该列宽度的值进行左填补显示的，而不是为了限制在该列中存储值的宽度，也 不是为了限制那些超过该列指定宽度的值的可被显示的数字位数。注意，如果在一个整型列中存储一个超过显示宽度的更大值时，当 MySQL 为某些复杂的联结(join)生成临时表时，你可能会遇到问题，因为在这种情况下，MySQL 信任地认为所有的值均适合原始的列宽度。

而int本身就是4个字节 bigint是8个字节 所以说int(X)的含义就是 int决定数据存储的字节 X表示期望数据的列宽度

在SQL语句中int代表你要创建字段的类型，int代表整型，11代表字段的长度。

这个代表显示宽度
整数列的显示宽度与mysql需要用多少个字符来显示该列数值，与该整数需要的存储空间的大小都没有关系，比如，不管设定了显示宽度是多少个字符，bigint都要占用8个字节。

> 举个例子最明白，类似于位数不足以0补全。


```
mysql> create table joke (a int(11)); Query OK, 0 rows affected (0.01 sec)

mysql> insert into joke values(100); Query OK, 1 row affected (0.00 sec)

mysql> select * from joke;
+------+
| a |
+------+
| 100 |
+------+
1 row in set (0.00 sec)

mysql> alter table joke change a a int(11) zerofill;
Query OK, 1 row affected (0.00 sec)
Records: 1 Duplicates: 0 Warnings: 0

mysql> select * from joke;
+-------------+
| a |
+-------------+
| 00000000100 | 
+-------------+
1 row in set (0.00 sec)

-- 00000000100 显示为11位
```
## FAQ
**外部机器连接不上虚拟机上的MySql解决办法**
```
cd /etc/mysql/mysql.conf.d
sudo vi mysqld.cnf
---------------
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
# bind-address		= 127.0.0.1 -- 注释掉
#
# * Fine Tuning
#
```
