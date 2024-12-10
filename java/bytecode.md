# Java基础知识总结

## Java 简介

Java是由Sun Microsystems公司于1995年5月推出的Java面向对象程序设计语言和Java平台的总称。由James Gosling和同事们共同研发，并在1995年正式推出。

Java分为三个体系：

- JavaSE（J2SE）（Java 2 Platform Standard Edition，java平台标准版）
- JavaEE(J2EE)(Java 2 Platform,Enterprise Edition，java平台企业版)
- JavaME(J2ME)(Java 2 Platform Micro Edition，java平台微型版)。

2005年6月，JavaOne大会召开，SUN公司公开Java SE 6。此时，Java的各种版本已经更名以取消其中的数字"2"：J2EE更名为Java EE, J2SE更名为Java SE，J2ME更名为Java ME。

## 从HEllo World 说起

##### 第一个Java程序

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

##### 如何编译并运行

```
$ javac HelloWorld.java
$ java HelloWorld
Hello World
```

##### main方法的入参`String args[]`有什么用，可以不写吗？有其他写法吗？

当我们去除`String[] args`编译并运行后会得到以下结果

```
$ java HelloWorld
错误: 在类 HelloWorld 中找不到 main 方法, 请将 main 方法定义为:
   public static void main(String[] args)
否则 JavaFX 应用程序类必须扩展javafx.application.Application
```

可见 main方法的入参是不能去除的。Java本身并不存在不带`String[] args`的main方法，
但是我们可以有其他的写法：

`String args[]`、 `String[] args`和`String... args` 都可以执行，但推荐使用 `String[] args`，这样可以避免歧义和误读。其中`String[] args`是保留了C语言的写法

##### 那如何传参呢？

首先改造一下我们的代码

```
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
        System.out.println(args[0]);
        System.out.println(args[1]);
    }
}
```
利用命令行窗口传参：

```
$ java HelloWorld a b
Hello World
a
b
```

##### 我们生成的`HelloWorld.class`到底长什么样?

利用[ClassViewer](https://github.com/ClassViewer/ClassViewer)来查看class文件

```
CA FE BA BE 00 00 00 34 00 1D 0A 00 06 00 0F 09 
00 10 00 11 08 00 12 0A 00 13 00 14 07 00 15 07 
00 16 01 00 06 3C 69 6E 69 74 3E 01 00 03 28 29 
56 01 00 04 43 6F 64 65 01 00 0F 4C 69 6E 65 4E 
75 6D 62 65 72 54 61 62 6C 65 01 00 04 6D 61 69 
6E 01 00 16 28 5B 4C 6A 61 76 61 2F 6C 61 6E 67 
2F 53 74 72 69 6E 67 3B 29 56 01 00 0A 53 6F 75 
72 63 65 46 69 6C 65 01 00 0F 48 65 6C 6C 6F 57 
6F 72 6C 64 2E 6A 61 76 61 0C 00 07 00 08 07 00 
17 0C 00 18 00 19 01 00 0B 48 65 6C 6C 6F 20 57 
6F 72 6C 64 07 00 1A 0C 00 1B 00 1C 01 00 0A 48 
65 6C 6C 6F 57 6F 72 6C 64 01 00 10 6A 61 76 61 
2F 6C 61 6E 67 2F 4F 62 6A 65 63 74 01 00 10 6A 
61 76 61 2F 6C 61 6E 67 2F 53 79 73 74 65 6D 01 
00 03 6F 75 74 01 00 15 4C 6A 61 76 61 2F 69 6F 
2F 50 72 69 6E 74 53 74 72 65 61 6D 3B 01 00 13 
6A 61 76 61 2F 69 6F 2F 50 72 69 6E 74 53 74 72 
65 61 6D 01 00 07 70 72 69 6E 74 6C 6E 01 00 15 
28 4C 6A 61 76 61 2F 6C 61 6E 67 2F 53 74 72 69 
6E 67 3B 29 56 00 21 00 05 00 06 00 00 00 00 00 
02 00 01 00 07 00 08 00 01 00 09 00 00 00 1D 00 
01 00 01 00 00 00 05 2A B7 00 01 B1 00 00 00 01 
00 0A 00 00 00 06 00 01 00 00 00 01 00 09 00 0B 
00 0C 00 01 00 09 00 00 00 25 00 02 00 01 00 00 
00 09 B2 00 02 12 03 B6 00 04 B1 00 00 00 01 00 
0A 00 00 00 0A 00 02 00 00 00 03 00 08 00 04 00 
01 00 0D 00 00 00 02 00 0E  
```
这是一个十六进制符号组成的文件

字节码结构：

- 魔数与class文件版本
- 常量池
- 访问标志
- 类索引、父类索引、接口索引
- 字段表集合
- 方法表集合
- 属性表集合

看不明白没有关系，java提供了javap命令可以查看内容是什么。


```
$ javap -verbose HelloWorld
Classfile /D:/demo/HelloWorld.class
  Last modified 2019-12-27; size 425 bytes
  MD5 checksum 63e47f1d243e0eb6bc952df3f6ac0d5a
  Compiled from "HelloWorld.java"
public class HelloWorld
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #6.#15         // java/lang/Object."<init>":()V
   #2 = Fieldref           #16.#17        // java/lang/System.out:Ljava/io/PrintStream;
   #3 = String             #18            // Hello World
   #4 = Methodref          #19.#20        // java/io/PrintStream.println:(Ljava/lang/String;)V
   #5 = Class              #21            // HelloWorld
   #6 = Class              #22            // java/lang/Object
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               main
  #12 = Utf8               ([Ljava/lang/String;)V
  #13 = Utf8               SourceFile
  #14 = Utf8               HelloWorld.java
  #15 = NameAndType        #7:#8          // "<init>":()V
  #16 = Class              #23            // java/lang/System
  #17 = NameAndType        #24:#25        // out:Ljava/io/PrintStream;
  #18 = Utf8               Hello World
  #19 = Class              #26            // java/io/PrintStream
  #20 = NameAndType        #27:#28        // println:(Ljava/lang/String;)V
  #21 = Utf8               HelloWorld
  #22 = Utf8               java/lang/Object
  #23 = Utf8               java/lang/System
  #24 = Utf8               out
  #25 = Utf8               Ljava/io/PrintStream;
  #26 = Utf8               java/io/PrintStream
  #27 = Utf8               println
  #28 = Utf8               (Ljava/lang/String;)V
{
  public HelloWorld();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 1: 0

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String Hello World
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 3: 0
        line 4: 8
}
SourceFile: "HelloWorld.java"
```
那这些对我们学习Java有什么帮助呢？

看一个Demo

```
public class Demo1 {
    public static void main(String args[]) {
        test1();
    }

    private static void test1() {
        String a = "a" + "b" + 1;
        String b = "ab1";
        System.out.println(a == b);// 输出true
    }
}
```
有些同学可能知道这是编译器编译时优化，那到底从哪里可以看出来呢？

jdk1.8

```
$ javap -verbose Demo1
Classfile /D:/demo/Demo1.class
  Last modified 2019-12-28; size 684 bytes
  MD5 checksum b97fb95f5e6893b4aeb32cd49fda74fd
public class Demo1
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #7.#26         // java/lang/Object."<init>":()V
   #2 = Methodref          #6.#27         // Demo1.test1:()V
   #3 = String             #28            // ab1
   #4 = Fieldref           #29.#30        // java/lang/System.out:Ljava/io/PrintStream;
   #5 = Methodref          #31.#32        // java/io/PrintStream.println:(Z)V
   #6 = Class              #33            // Demo1
   #7 = Class              #34            // java/lang/Object
   #8 = Utf8               <init>
   #9 = Utf8               ()V
  #10 = Utf8               Code
  #11 = Utf8               LineNumberTable
  #12 = Utf8               LocalVariableTable
  #13 = Utf8               this
  #14 = Utf8               LDemo1;
  #15 = Utf8               main
  #16 = Utf8               ([Ljava/lang/String;)V
  #17 = Utf8               args
  #18 = Utf8               [Ljava/lang/String;
  #19 = Utf8               test1
  #20 = Utf8               a
  #21 = Utf8               Ljava/lang/String;
  #22 = Utf8               b
  #23 = Utf8               StackMapTable
  #24 = Class              #35            // java/lang/String
  #25 = Class              #36            // java/io/PrintStream
  #26 = NameAndType        #8:#9          // "<init>":()V
  #27 = NameAndType        #19:#9         // test1:()V
  #28 = Utf8               ab1
  #29 = Class              #37            // java/lang/System
  #30 = NameAndType        #38:#39        // out:Ljava/io/PrintStream;
  #31 = Class              #36            // java/io/PrintStream
  #32 = NameAndType        #40:#41        // println:(Z)V
  #33 = Utf8               Demo1
  #34 = Utf8               java/lang/Object
  #35 = Utf8               java/lang/String
  #36 = Utf8               java/io/PrintStream
  #37 = Utf8               java/lang/System
  #38 = Utf8               out
  #39 = Utf8               Ljava/io/PrintStream;
  #40 = Utf8               println
  #41 = Utf8               (Z)V
{
  public Demo1();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 1: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   LDemo1;

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=0, locals=1, args_size=1
         0: invokestatic  #2                  // Method test1:()V
         3: return
      LineNumberTable:
        line 3: 0
        line 4: 3
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       4     0  args   [Ljava/lang/String;
}
```
jdk1.7 版本

```
public static void test1(); 
Code: Stack= 3, Locals= 2, Args_ size= 0 
0: ldc #2; //String ab1 
2: astore_ 0 
3: ldc #2; //String ab1 
5: astore_ 1 
6: getstatic #3; //Field java/ lang/ System. out: Ljava/ io/ PrintStream; 
9: aload_ 0 
10: aload_ 1 
11: if_ acmpne 18 
14: iconst_ 1 
15: goto 19 
18: iconst_ 0 
19: invokevirtual #4; //Method java/ io/ PrintStream. println:( Z) V 
22: return 
```

此时你理解了什么是编译时优化了吗？再看一个Demo

```
public class Demo2 {

    public static void main(String[] args) {
        test2();
    }

    private static String getA() {
        return "a";
    }

    public static void test2() {
        String a = "a";
        final String c = "a";
        String b = a + "b";
        String d = c + "b";
        String e = getA() + "b";
        String ab = "ab";
        String f = "a";

        System.out.println(b == ab);// false
        System.out.println(d == ab);// true
        System.out.println(e==ab);// false
    }
}

```
我们发现，只有在编译阶段能确定这个final引用赋值的内容，编译器才有可能进行编译时优化（请不要和运行时的操作扯到一起，那样你可能理解不清楚），而在编译阶段能确定的内容只能来自于常量池中，例如int、long、String等常量，也就是不包含newString（）、newInteger（）这样的操作，因为这是运行时决定的，也不包含方法的返回值。因为运行时它可能返回不同的值，带着这个基本思想，对于编译时的优化理解就基本不会出错了。

再看最后一个Demo

```
public class Demo3 {
    public static void main(String[] args) {
        test();
    }
    public static void test() {
        int a = 1, b = 1, c = 1, d = 1;
        a++;
        ++b;
        c = c++;
        d = ++d;
        System.out.println(a + "\t" + b + "\t" + c + "\t" + d);// 2	2 1	2
    }
}
```


```
$ javap -verbose Demo3
Classfile /D:/demo/Demo3.class
  Last modified 2019-12-27; size 737 bytes
  MD5 checksum 90dc86b5a7359393cd58ea690bb795e2
  Compiled from "Demo3.java"
public class Demo3
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #12.#22        // java/lang/Object."<init>":()V
   #2 = Methodref          #11.#23        // Demo3.test:()V
   #3 = Fieldref           #24.#25        // java/lang/System.out:Ljava/io/PrintStream;
   #4 = Class              #26            // java/lang/StringBuilder
   #5 = Methodref          #4.#22         // java/lang/StringBuilder."<init>":()V
   #6 = Methodref          #4.#27         // java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
   #7 = String             #28            // \t
   #8 = Methodref          #4.#29         // java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
   #9 = Methodref          #4.#30         // java/lang/StringBuilder.toString:()Ljava/lang/String;
  #10 = Methodref          #31.#32        // java/io/PrintStream.println:(Ljava/lang/String;)V
  #11 = Class              #33            // Demo3
  #12 = Class              #34            // java/lang/Object
  #13 = Utf8               <init>
  #14 = Utf8               ()V
  #15 = Utf8               Code
  #16 = Utf8               LineNumberTable
  #17 = Utf8               main
  #18 = Utf8               ([Ljava/lang/String;)V
  #19 = Utf8               test
  #20 = Utf8               SourceFile
  #21 = Utf8               Demo3.java
  #22 = NameAndType        #13:#14        // "<init>":()V
  #23 = NameAndType        #19:#14        // test:()V
  #24 = Class              #35            // java/lang/System
  #25 = NameAndType        #36:#37        // out:Ljava/io/PrintStream;
  #26 = Utf8               java/lang/StringBuilder
  #27 = NameAndType        #38:#39        // append:(I)Ljava/lang/StringBuilder;
  #28 = Utf8               \t
  #29 = NameAndType        #38:#40        // append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
  #30 = NameAndType        #41:#42        // toString:()Ljava/lang/String;
  #31 = Class              #43            // java/io/PrintStream
  #32 = NameAndType        #44:#45        // println:(Ljava/lang/String;)V
  #33 = Utf8               Demo3
  #34 = Utf8               java/lang/Object
  #35 = Utf8               java/lang/System
  #36 = Utf8               out
  #37 = Utf8               Ljava/io/PrintStream;
  #38 = Utf8               append
  #39 = Utf8               (I)Ljava/lang/StringBuilder;
  #40 = Utf8               (Ljava/lang/String;)Ljava/lang/StringBuilder;
  #41 = Utf8               toString
  #42 = Utf8               ()Ljava/lang/String;
  #43 = Utf8               java/io/PrintStream
  #44 = Utf8               println
  #45 = Utf8               (Ljava/lang/String;)V
{
  public Demo3();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 1: 0

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=0, locals=1, args_size=1
         0: invokestatic  #2                  // Method test:()V
         3: return
      LineNumberTable:
        line 3: 0
        line 4: 3

  public static void test();
    descriptor: ()V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=3, locals=4, args_size=0
         0: iconst_1
         1: istore_0
         2: iconst_1
         3: istore_1
         4: iconst_1
         5: istore_2
         6: iconst_1
         7: istore_3
         8: iinc          0, 1
        11: iinc          1, 1
        14: iload_2
        15: iinc          2, 1
        18: istore_2
        19: iinc          3, 1
        22: iload_3
        23: istore_3
        24: getstatic     #3                  // Field java/lang/System.out:Ljava/io/PrintStream;
        27: new           #4                  // class java/lang/StringBuilder
        30: dup
        31: invokespecial #5                  // Method java/lang/StringBuilder."<init>":()V
        34: iload_0
        35: invokevirtual #6                  // Method java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
        38: ldc           #7                  // String \t
        40: invokevirtual #8                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        43: iload_1
        44: invokevirtual #6                  // Method java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
        47: ldc           #7                  // String \t
        49: invokevirtual #8                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        52: iload_2
        53: invokevirtual #6                  // Method java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
        56: ldc           #7                  // String \t
        58: invokevirtual #8                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        61: iload_3
        62: invokevirtual #6                  // Method java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
        65: invokevirtual #9                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
        68: invokevirtual #10                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        71: return
      LineNumberTable:
        line 6: 0
        line 7: 8
        line 8: 11
        line 9: 14
        line 10: 19
        line 11: 24
        line 12: 71
}
SourceFile: "Demo3.java"
```

其中14、15、18行相当于

```
int tmp = c; c++; c = tmp;
```

















