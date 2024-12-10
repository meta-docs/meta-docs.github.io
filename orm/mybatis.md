# Mybatis

**id自增长**
```
<insert id="insertUser" parameterType="com.spring.mybatis.po.User"> 
     
     <!--selectKey获取插入的id值
         keyProperty="id"：将查询到主键设置到对象中的某个属性上
         order="AFTER"：执行查询主键ID值的顺AFTER：执行之后获取
         resultType：获取返回结果类型(包装类)
         SELECT LAST_INSERT_ID()：MySql获取自增主键的函数
     <!--针对自增主键的表，在插入时不需要主键，而是在插入过程自动获取一个自增的主键，比如MySQL-->
     <selectKey keyProperty="id" order="AFTER" resultType="java.lang.Integer">
         SELECT LAST_INSERT_ID()
     </selectKey>
     -->
     <!--  非自增
     <selectKey keyProperty="id" order="BEFORE" resultType="java.lang.Integer">
         SELECT UUID()
     </selectKey>
     -->
     <!--针对Sequence主键而言，在执行insert sql前必须指定一个主键值给要插入的记录，如Oracle、DB2-->
     <!-- ORACLE -->
     <selectKey keyProperty="id" order="BEFORE" resultType="java.lang.Integer">
         SELECT sequenceName.nextval()
     </selectKey>
     
  INSERT INTO USER(username,birthday,sex,address) VALUE(#{username},#{birthday},#{sex},#{address})
  </insert>
```
