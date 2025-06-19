# Gradle 配置

## 配置环境变量

```
GRADLE_USER_HOME
```

## build

```
.\gradlew clean build -x test -x integrationTest

.\gradlew gks-mix-demo-protocol:clean build publish -x test -x integrationTest
```

## 配置代理

修改项目中 `gradle.properties` 配置

```
systemProp.http.proxyHost=your-proxy-host
systemProp.http.proxyPort=port
systemProp.https.proxyHost=your-proxy-host
systemProp.https.proxyPort=port
```

## 在 `gradle.properties` 中指定 jdk 版本

```
org.gradle.java.home=C:/apps/java/jdk-17.0.5
```
