# 静态内部类和内部类的区别
```
static class Outer {
	class Inner {}
	static class StaticInner {}
}

Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
Outer.StaticInner inner0 = new Outer.StaticInner();
```

> Terminology: Nested classes are divided into two categories: static and non-static. Nested classes that are declared static are called static nested classes. Non-static nested classes are called inner classes.(https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html)

从字面上看，一个被称为静态嵌套类，一个被称为内部类。从字面的角度解释是这样的：什么是嵌套？嵌套就是我跟你没关系，自己可以完全独立存在，但是我就想借你的壳用一下，来隐藏一下我自己（真TM猥琐）。什么是内部？内部就是我是你的一部分，我了解你，我知道你的全部，没有你就没有我。（所以内部类对象是以外部类对象存在为前提的）

静态内部类与非静态内部类之间存在一个最大的区别，就是非静态内部类在编译完成之后会隐含地保存着一个引用，该引用是指向创建它的外围内，但是静态内部类却没有。所以相对来说静态内部类更节约内存

###### 静态内部类

- 实例化不需要依赖于外围类的。
- 不能使用任何外围类的非static成员变量和方法。
- 降低包的深度，方便类的使用和结构管理。

比如有A，B两个类，B有点特殊，虽然可以独立存在，但只被A使用。这时候怎么办？如果把B并入A里，复杂度提高，搞得A违反单一职责。如果B独立，又可能被其他类（比如同一个包下的C）依赖，不符合设计的本意。所以不如将其变成A.B，等于添加个注释，告诉其他类别使用B了，它只跟A玩。非静态的才是真正的内部类，对其外部类有个引用。




###### 内部类

- 可以自由使用外部类的所有变量和方法
- 非静态内部类可能导致内存泄漏的问题

###### 关于序列化

强烈不建议对本地内部类和匿名内部类进行序列化。

> Serialization of inner classes, including local and anonymous classes, is strongly discouraged. When the Java compiler compiles certain constructs, such as inner classes, it creates synthetic constructs; these are classes, methods, fields, and other constructs that do not have a corresponding construct in the source code. Synthetic constructs enable Java compilers to implement new Java language features without changes to the JVM. However, synthetic constructs can vary among different Java compiler implementations, which means that .class files can vary among different implementations as well. Consequently, you may have compatibility issues if you serialize an inner class and then deserialize it with a different JRE implementation. See the section Implicit and Synthetic Parameters in the section Obtaining Names of Method Parameters for more information about the synthetic constructs generated when an inner class is compiled.