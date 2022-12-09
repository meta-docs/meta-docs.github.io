import{_ as e,V as i,W as n,a1 as d}from"./framework.46148295.js";const s={},l=d(`<h1 id="mysql-常用命令总结" tabindex="-1"><a class="header-anchor" href="#mysql-常用命令总结" aria-hidden="true">#</a> MySQL 常用命令总结</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 使用SHOW语句找出在服务器上当前存在什么数据库：
SHOW DATABASES;
-- 创建一个数据库MYSQLDATA
CREATE DATABASE MYSQLDATA;
-- 选择你所创建的数据库
USE MYSQLDATA; (按回车键出现DATABASE CHANGED 时说明操作成功！)
-- 查看现在的数据库中存在什么表
SHOW TABLES;
-- 创建一个数据库表
CREATE TABLE MY_TABLE (NAME VARCHAR(20), SEX CHAR(1));
-- 显示表的结构. 
DESCRIBE MY_TABLE;
-- 往表中加入记录
INSERT INTO MY_TABLE VALUES (”HYQ”,”M”);
-- 用文本方式将数据装入数据库表中（例如D. /MYSQL.TXT）
LOAD DATA LOCAL INFILE “D. /MYSQL.TXT” INTO TABLE MY_TABLE;
-- 导入.SQL文件命令（例如D. /MYSQL.SQL）
USE DATABASE;
SOURCE D:/MYSQL.SQL;
-- 删除表
DROP TABLE MY_TABLE;
-- 清空表
DELETE FROM MY_TABLE;
-- 更新表中数据
UPDATE MY_TABLE SET SEX=”F” WHERE NAME=’HYQ’;
-- 多张表外键关联删除时添加
SET FOREIGN_KEY_CHECKS = 0;
-- 删除完成后设置 
SET FOREIGN_KEY_CHECKS = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><ul><li>唯一约束(命名: UK_域_表_字段1_字段2)</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ALTER TABLE \`ODR\`.\`ODR_CART\` ADD UNIQUE INDEX \`UK_ODR_CART_USER_ID_SCM_ID\` (\`USER_ID\`,\`SCM_ID\`);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>删除索引</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ALTER TABLE \`ODR\`.\`ODR_CART\` DROP INDEX \`UK_ODR_CART_USER_ID_SCM_ID\` ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>创建索引 索引命名：IDX_SHP_FARE_TEMPLATE_CUSTOMER_ID&gt;&gt;IDX_表名_字段名 SQL语句：CREATE INDEX <code>IDX_SHP_FARE_TEMPLATE_CUSTOMER_ID</code> ON <code>SHP</code>.<code>SHP_FARE_TEMPLATE</code> (<code>CUSTOMER_ID</code> ASC);</li></ul><p>统计某个字段某个值的出现次数大于1</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT COLUMNNAME, count(*) FROM TABLE_NAME GROUP BY COLUMNNAME HAVING count(*) &gt; 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>load csv文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT * FROM XY.XY_MODEL INTO OUTFILE &#39;/var/lib/mysql-files/XY20170825.csv&#39; FIELDS TERMINATED BY &#39;,&#39; ENCLOSED BY &#39;&quot;&#39; LINES TERMINATED BY &#39;\\n&#39;;

LOAD DATA INFILE &#39;/var/lib/mysql-files/XY20170825.csv&#39; INTO TABLE XY.XY_MODEL FIELDS TERMINATED BY &#39;,&#39; ENCLOSED BY &#39;&quot;&#39; LINES TERMINATED BY &#39;\\n&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改mysql自增Id</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ALTER TABLE XY.XY_MODEL AUTO_INCREMENT=34076;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>索引可以提高数据的检索效率，也可以降低数据库的IO成本，并且索引还可以降低数据库的排序成本。排序分组操作主要消耗的就是CPU资源和内存，所以能够在排序分组操作中好好的利用索引将会极大地降低CPU资源的消耗。</p><p>如何判定是否需要创建索引？</p><p>1、较频繁地作为查询条件的字段</p><p>这个都知道。什么是教频繁呢？分析你执行的所有SQL语句。最好将他们一个个都列出来。然后分析，发现其中有些字段在大部分的SQL语句查询时候都会用到，那么就果断为他建立索引。</p><p>2、唯一性太差的字段不适合建立索引</p><p>什么是唯一性太差的字段。如状态字段、类型字段。那些只存储固定几个值的字段，例如用户登录状态、消息的status等。这个涉及到了索引扫描的特性。例如：通过索引查找键值为A和B的某些数据，通过A找到某条相符合的数据，这条数据在X页上面，然后继续扫描，又发现符合A的数据出现在了Y页上面，那么存储引擎就会丢弃X页面的数据，然后存储Y页面上的数据，一直到查找完所有对应A的数据，然后查找B字段，发现X页面上面又有对应B字段的数据，那么他就会再次扫描X页面，等于X页面就会被扫描2次甚至多次。以此类推，所以同一个数据页可能会被多次重复的读取，丢弃，在读取，这无疑给存储引擎极大地增加了IO的负担。</p><p>3、更新太频繁地字段不适合创建索引</p><p>当你为这个字段创建索引时候，当你再次更新这个字段数据时，数据库会自动更新他的索引，所以当这个字段更新太频繁地时候那么就是不断的更新索引，性能的影响可想而知。大概被检索几十次会更新一次的字段才比较符合建立索引的规范。而如果一个字段同一个时间段内被更新多次，那么果断不能为他建立索引。</p><p>4、不会出现在where条件中的字段不该建立索引</p><p>这个相信大家都知道。</p>`,24),a=[l];function E(v,c){return i(),n("div",null,a)}const t=e(s,[["render",E],["__file","command.html.vue"]]);export{t as default};
