# 单例模式

[详解9种Java单例模式](https://mp.weixin.qq.com/s/-MShVr8txQ6nced-EhxAIg)

## 1 懒汉式（线程不安全）

其主要表现在单例类在外部需要创建实例化对象时再进行实例化，进而达到Lazy Loading 的效果。通过静态方法 `getSingleton()` 和 `private` 权限构造方法为创建一个实例化对象提供唯一的途径。

不足：未考虑到多线程的情况下可能会存在多个访问者同时访问，发生构造出多个对象的问题，所以在多线程下不可用这种方法。

```
/**
 * 懒汉式（线程不安全）
 */
public class Singleton {

    private static Singleton singleton;

    private Singleton() {
    }

    public static Singleton getSingleton() {
        if (singleton == null) {
            singleton = new Singleton();
        }
        return singleton;
    }
}
```

## 2 懒汉式（线程安全，同步方法，不推荐使用）
针对懒汉式的线程不安全，自然会想到给 `getSingleton()` 进行 `synchronized` 加锁来保证线程同步。

不足：效率低。大多数情况下这个锁占用的额外资源都浪费了，每个线程在想获得类的实例时候，执行 `getSingleton()` 方法都要进行同步。


```
/**
 * 懒汉式（线程安全，同步方法，不推荐使用）
 */
public class Singleton {

    private static Singleton singleton;

    private Singleton() {
    }

    public static synchronized Singleton getSingleton() {
        if (singleton == null) {
            singleton = new Singleton();
        }
        return singleton;
    }
}
```

## 3 饿汉式（线程安全）
在进行类加载时完成实例化对象的过程就是饿汉式的形式。

避免了线程同步问题，在运行这个类的时候进行加载，之后直接访问

不足：相比接下来的静态内部类而言，这种方法比静态内部类多了内存常驻，容易造成内存浪费，也未达到延迟加载的效果。


```
/**
 * 饿汉式（线程安全）
 */
public class Singleton {

    private static Singleton singleton = new Singleton();

    private Singleton() {
    }

    public static Singleton getSingleton() {
        return singleton;
    }
}

```

## 4 静态内部类加载（线程安全）
静态内部类不会在单例加载时加载，当调用 `getSingleton()` 方法时才会进行加载，达到类似懒汉式效果，并且也是线程安全的。

类的静态属性只会在第一次加载类时进行初始化，JVM 帮助我们保证了线程的安全性，在类进行初始化时，其他线程无法进入。


```
/**
 * 静态内部类加载（线程安全）
 */
public class Singleton {

    private static Singleton singleton;

    private Singleton() {
    }

    private static class SingletonInner {
        private static final Singleton instance = new Singleton();
    }

    public static Singleton getSingleton() {
        return SingletonInner.instance;
    }

}
```

## 5 枚举（线程安全）
自由串行化；保证只有一个实例；线程安全。
Effective Java 作者所提倡的方法，近乎完美，在继承场景下不适用。

```
/**
 * 枚举
 */
enum Singleton {
    INSTANCE;
    public void method(){
    }
}

class Demo {
    public static void main(String[] args) {
        Singleton.INSTANCE.method();
    }
}
```


## 6 懒汉式双重校验锁法（通常线程安全，不可保证完全安全）
使用同步代码块避免了第二种方法的效率低的问题，但此方法并不能完全起到线程同步的作用，与上面第一种方法产生的问题相似，多线程访问时可能产生多个对象。

```
/**
 * 懒汉式双重校验锁法（通常线程安全，不可保证完全安全）
 */
public class Singleton {

    private static Singleton singleton;

    private Singleton() {
    }

    public static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }

}
```
## 7 懒汉式双重检查终极版（面试手写推荐）
与第六种方法不同的是，此方法给 `singleton` 的声明上加了关键字 `volatile` ，进而解决了低概率的线程不安全问题。
`volatile` 起到禁止指令重排的作用，在它赋值完成之前，就不会调用读操作 `(singleton == null)`。

```
/**
 * 懒汉式双重检查终极版（面试手写推荐）
 */
public class Singleton {

    private static volatile Singleton singleton;

    private Singleton() {
    }

    public static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }

}
```

## 8 使用 ThreadLocal 实现（线程安全）
ThreadLocal 会为每一个线程提供一个独立的变量副本，从而隔离了多个线程对数据的访问冲突。
对于多线程资源共享的问题，同步机制采用了“以时间换空间”的方式，而ThreadLocal 采用了“以空间换时间”的方式。前者仅提供一份变量，让不同的线程排队访问，而后者为每一个线程都提供了一份变量，因此可以同时访问而互不影响。


```
/**
 * 使用 ThreadLocal 实现（线程安全）
 */
public class Singleton {

    private static final ThreadLocal<Singleton> singleton = new ThreadLocal<Singleton>() {
        @Override
        protected Singleton initialValue() {
            return new Singleton();
        }
    };

    private Singleton() {

    }

    public static Singleton getSingleton() {
        return singleton.get();
    }

}
```
## 9 使用CAS 锁实现（线程安全）

```
/**
 * 使用CAS 锁实现（线程安全）
 */
public class Singleton {

    private static final AtomicReference<Singleton> INSTANCE = new AtomicReference<>();

    private Singleton() {
    }

    // 用 CAS 确保线程安全
    public static final Singleton getInstance() {
        for (; ; ) {
            Singleton current = INSTANCE.get();
            if (current != null) {
                return current;
            }
            current = new Singleton();
            if (INSTANCE.compareAndSet(null, current)) {
                return current;
            }
        }
    }

    public static void main(String[] args) {
        Singleton singleton1 = Singleton.getInstance();
        Singleton singleton2 = Singleton.getInstance();
        System.out.println(singleton1 == singleton2);
    }
}
```
