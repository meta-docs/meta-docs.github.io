# Java命名规范
## 蛇形编码
```
public class SnakeToCamelUtil {

    public static void main(String[] args) throws IOException {
        Stringline = "abc_def";

        BufferedReader reader = newBufferedReader(new FileReader(new  File("D:\\source.txt")));

        line = reader.readLine();
        while(line != null) {
            String[] lineArray = line.split("_");
            StringBuilder sb = new StringBuilder();
            sb.append(lineArray[0]);

            for (int i = 1; i < lineArray.length; i++) {
                sb.append(Character.toUpperCase(lineArray[i].charAt(0)) + lineArray[i].substring(1));
            }

            System.out.println(sb.toString());
            line = reader.readLine();
        }
        reader.close();
    }
}
```
## Bean参数校验

1. 获得属性字段名
```
public static String[] getFiledName(Object object) {
    try {
        Field[] fields = object.getClass().getDeclaredFields();
        String[] fieldNames = newString[fields.length];
        for (int i = 0; i < fields.length; i++) {
            fieldNames[i] = fields[i].getName();
        }
        return fieldNames;
    } catch (SecurityException e) {
        e.printStackTrace();
    }
    return null;
}
```
2. 获得属性值
```
public static Object getFieldValueByName(String fieldName, Objectobject) {
    try {
        String firstLetter = fieldName.substring(0, 1).toUpperCase();
        String getter = "get" + firstLetter + fieldName.substring(1);
        Methodmethod = object.getClass().getMethod(getter, new Class[] {});
        Object value = method.invoke(object, new Object[] {});
        if (value == null) {
            LOG.error("fieldValue is null: " + fieldName);
        }
        return value;
    } catch (Exception e) {
        LOG.error("fieldName is not exit: " + fieldName);
        return null;
    }
}

```
3. 校验参数
```
private static String[] mustFiled = {...};
public static boolean isFieldsNotEmpty(Object object) {
    boolean isFieldsNotEmpty = true;
    StringBuilder returnBuilder = new StringBuilder();
    List<String> list = Arrays.asList(mustFiled);
    String[] fieldNames = getFiledName(object);
    for (String fieldName : list) {
        if (requiredFields.contains(fieldName)) {
            Object value = getFieldValueByName(fieldName, object);
            if (value == null) {
                isFieldsNotEmpty = false;
                System.out.println("fieldValue cannot be null: " + fieldName);
                returnBuilder.append("fieldValue cannot be null: " + fieldName);
            }
        }
    }
    if (!StringUtils.isEmpty(returnBuilder.toString())) {
        thrownew WeChatApiProxyException(returnBuilder.toString());
    }
    return isFieldsNotEmpty;
}
```
