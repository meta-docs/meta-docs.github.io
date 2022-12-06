import{_ as e,V as i,W as n,a1 as l}from"./framework.46148295.js";const d={},s=l(`<h1 id="java命名规范" tabindex="-1"><a class="header-anchor" href="#java命名规范" aria-hidden="true">#</a> Java命名规范</h1><h2 id="蛇形编码" tabindex="-1"><a class="header-anchor" href="#蛇形编码" aria-hidden="true">#</a> 蛇形编码</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class SnakeToCamelUtil {

    public static void main(String[] args) throws IOException {
        Stringline = &quot;abc_def&quot;;

        BufferedReader reader = newBufferedReader(new FileReader(new  File(&quot;D:\\\\source.txt&quot;)));

        line = reader.readLine();
        while(line != null) {
            String[] lineArray = line.split(&quot;_&quot;);
            StringBuilder sb = new StringBuilder();
            sb.append(lineArray[0]);

            for (int i = 1; i &lt; lineArray.length; i++) {
                sb.append(Character.toUpperCase(lineArray[i].charAt(0)) + lineArray[i].substring(1));
            }

            System.out.println(sb.toString());
            line = reader.readLine();
        }
        reader.close();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bean参数校验" tabindex="-1"><a class="header-anchor" href="#bean参数校验" aria-hidden="true">#</a> Bean参数校验</h2><ol><li>获得属性字段名</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static String[] getFiledName(Object object) {
    try {
        Field[] fields = object.getClass().getDeclaredFields();
        String[] fieldNames = newString[fields.length];
        for (int i = 0; i &lt; fields.length; i++) {
            fieldNames[i] = fields[i].getName();
        }
        return fieldNames;
    } catch (SecurityException e) {
        e.printStackTrace();
    }
    return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>获得属性值</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static Object getFieldValueByName(String fieldName, Objectobject) {
    try {
        String firstLetter = fieldName.substring(0, 1).toUpperCase();
        String getter = &quot;get&quot; + firstLetter + fieldName.substring(1);
        Methodmethod = object.getClass().getMethod(getter, new Class[] {});
        Object value = method.invoke(object, new Object[] {});
        if (value == null) {
            LOG.error(&quot;fieldValue is null: &quot; + fieldName);
        }
        return value;
    } catch (Exception e) {
        LOG.error(&quot;fieldName is not exit: &quot; + fieldName);
        return null;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>校验参数</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private static String[] mustFiled = {...};
public static boolean isFieldsNotEmpty(Object object) {
    boolean isFieldsNotEmpty = true;
    StringBuilder returnBuilder = new StringBuilder();
    List&lt;String&gt; list = Arrays.asList(mustFiled);
    String[] fieldNames = getFiledName(object);
    for (String fieldName : list) {
        if (requiredFields.contains(fieldName)) {
            Object value = getFieldValueByName(fieldName, object);
            if (value == null) {
                isFieldsNotEmpty = false;
                System.out.println(&quot;fieldValue cannot be null: &quot; + fieldName);
                returnBuilder.append(&quot;fieldValue cannot be null: &quot; + fieldName);
            }
        }
    }
    if (!StringUtils.isEmpty(returnBuilder.toString())) {
        thrownew WeChatApiProxyException(returnBuilder.toString());
    }
    return isFieldsNotEmpty;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),a=[s];function r(t,v){return i(),n("div",null,a)}const c=e(d,[["render",r],["__file","naming-conventions.html.vue"]]);export{c as default};
