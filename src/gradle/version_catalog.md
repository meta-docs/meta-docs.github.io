# Gradle Version Catalog 说明

## Sharing catalogs 分享目录

Gradle 7.x 版本提供了 version catalog 插件用于声明版本目录，可用于替代maven bom。

### 提供目录

`build.gradle` 文件如下

```groovy
plugins {
    // Gradle 提供的一个版本目录插件，它提供了声明、发布目录的能力
    id 'version-catalog'
    // 用于发布到 nexus
    id 'maven-publish'
}

// 定义目录
catalog {
    // declare the aliases, bundles and versions in this block
    versionCatalog {
        // 声明依赖库，组成方式 library('别名', 'group', 'artifact').version('version');
        // 别名必须包含由短横线 (- ，推荐)、下划线(_)或点(.)分隔的标识符，标识符本身必须由 ascii 字符组成，最好是小写字母，最后是数字。
        // version 声明具体的版本号
        // versionRef 引用 version() 中声明的版本号，可以用来声明一组具有相同的版本号的依赖库
        version('groovy', '3.0.5')
        library('commons-lang3', 'org.apache.commons', 'commons-lang3').version('3.9');
        library('groovy-core', 'org.codehaus.groovy', 'groovy').versionRef('groovy')
        library('groovy-json', 'org.codehaus.groovy', 'groovy-json').versionRef('groovy')
        library('groovy-nio', 'org.codehaus.groovy', 'groovy-nio').versionRef('groovy')
        

        // Spring 提供的一些 Bom，引入了一组依赖，但用的是Maven方式
        // 使用时通过，同样不需要声明版本 
        // implementation 'org.springframework.boot:spring-boot-starter-web'
        library('spring-boot-dependencies', 'org.springframework.boot', 'spring-boot-dependencies').version('2.7.5');
        library('spring-cloud-alibaba-dependencies', 'com.alibaba.cloud', 'spring-cloud-alibaba-dependencies').version('2021.0.4.0');

        // 声明插件
        plugin('sonarqube', 'org.sonarqube').version('3.0')
        plugin('spring-boot', 'org.springframework.boot').version('2.7.5')
        plugin('spring-dependency-management', 'io.spring.dependency-management').version('1.0.15.RELEASE')
    }
}

publishing {
    repositories {
        maven {
            name = "nexus-xxx"
            url = "https://nexus.xxx.com/repository/releases/"
            credentials {
                username = 'xxx'
                password = 'xxxxx'
            }
        }
    }
    publications {
        maven(MavenPublication) {
            from components.versionCatalog
            groupId = 'com.skycoresaas.arch'
            artifactId = 'xxx-dependencies'
            version = '1.0.0'
        }
    }

}
```

- 