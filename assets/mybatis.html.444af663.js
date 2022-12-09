import{_ as e,V as t,W as n,a1 as i}from"./framework.46148295.js";const s={},l=i(`<h1 id="mybatis" tabindex="-1"><a class="header-anchor" href="#mybatis" aria-hidden="true">#</a> Mybatis</h1><p><strong>id自增长</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;insert id=&quot;insertUser&quot; parameterType=&quot;com.spring.mybatis.po.User&quot;&gt; 
     
     &lt;!--selectKey获取插入的id值
         keyProperty=&quot;id&quot;：将查询到主键设置到对象中的某个属性上
         order=&quot;AFTER&quot;：执行查询主键ID值的顺AFTER：执行之后获取
         resultType：获取返回结果类型(包装类)
         SELECT LAST_INSERT_ID()：MySql获取自增主键的函数
     &lt;!--针对自增主键的表，在插入时不需要主键，而是在插入过程自动获取一个自增的主键，比如MySQL--&gt;
     &lt;selectKey keyProperty=&quot;id&quot; order=&quot;AFTER&quot; resultType=&quot;java.lang.Integer&quot;&gt;
         SELECT LAST_INSERT_ID()
     &lt;/selectKey&gt;
     --&gt;
     &lt;!--  非自增
     &lt;selectKey keyProperty=&quot;id&quot; order=&quot;BEFORE&quot; resultType=&quot;java.lang.Integer&quot;&gt;
         SELECT UUID()
     &lt;/selectKey&gt;
     --&gt;
     &lt;!--针对Sequence主键而言，在执行insert sql前必须指定一个主键值给要插入的记录，如Oracle、DB2--&gt;
     &lt;!-- ORACLE --&gt;
     &lt;selectKey keyProperty=&quot;id&quot; order=&quot;BEFORE&quot; resultType=&quot;java.lang.Integer&quot;&gt;
         SELECT sequenceName.nextval()
     &lt;/selectKey&gt;
     
  INSERT INTO USER(username,birthday,sex,address) VALUE(#{username},#{birthday},#{sex},#{address})
  &lt;/insert&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),d=[l];function r(a,u){return t(),n("div",null,d)}const c=e(s,[["render",r],["__file","mybatis.html.vue"]]);export{c as default};
