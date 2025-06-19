# GKM Dockerfile

```dockerfile
FROM openjdk:17-jdk-alpine
VOLUME ["/tmp", "/nfs"]

ENV LANG C.UTF-8
ENV TIMEZONE Asia/Shanghai

RUN echo "https://mirrors.aliyun.com/alpine/v3.14/main" > /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/v3.14/community" >> /etc/apk/repositories

RUN apk add -U tzdata && ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && echo "${TIMEZONE}" > /etc/timezone

RUN apk add --update curl iproute2 drill tini ttf-dejavu wget && rm -rf /var/cache/apk/*

EXPOSE 33200

ARG JAR_FILE=xpt-org-app/build/libs/xpt-org-app-0.1.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["tini"]
CMD ["sh", "-c", "java ${JAVA_OPTS} -jar /app.jar ${0} ${@}"]

```
