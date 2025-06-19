```
# eureka
eureka.client.service-url.defaultZone=http://gks:gks@${eureka.environment}.gks-eureka-inst1.server:2001/eureka/,http://gks:gks@${eureka.environment}.gks-eureka-inst2.server:2001/eureka/
eureka.instance.metadataMap.zone = 1.0.0
eureka.instance.prefer-ip-address=true
eureka.client.preferSameZoneEureka = true
eureka.client.fetch-registry=true
# 不注册Eureka
eureka.client.register-with-eureka=false

resilience4j.circuitbreaker.configs.default.register-health-indicator=true
resilience4j.circuitbreaker.configs.default.writable-stack-trace-enabled=false
resilience4j.circuitbreaker.configs.default.allow-health-indicator-to-fail=false
resilience4j.ratelimiter.configs.default.register-health-indicator=true
resilience4j.ratelimiter.configs.default.writable-stack-trace-enabled=false
resilience4j.ratelimiter.configs.default.allow-health-indicator-to-fail=false
resilience4j.retry.configs.default.ignore-exceptions[0]=feign.codec.DecodeException
resilience4j.retry.configs.default.ignore-exceptions[1]=com.gongkongsaas.common.exception.GKSBusinessWithErrorCodeException

management.endpoint.shutdown.enabled=true
management.security.enabled=false
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
management.endpoints.shutdown.sensitive=false
management.endpoints.shutdown.enabled=true
management.health.circuitbreakers.enabled=true
management.health.ratelimiters.enabled=true

management.metrics.export.elastic.enabled=false
management.metrics.export.elastic.user-name=elastic
management.metrics.export.elastic.password=elasticsearch
management.metrics.export.elastic.host=http://${eureka.environment}.gks-els7-prd-coordinating1.server:2004
management.metrics.export.elastic.index=spring-metrics
management.metrics.export.elastic.step=15s
management.metrics.export.elastic.index-date-format=yyyy-MM-dd
management.metrics.export.elastic.connect-timeout=10s

# feign-debug-log
gks.feign.log-level=FULL

# app
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
mybatis.mapperLocations=classpath:mapper/**/*.xml
spring.rabbitmq.host=${eureka.environment}.gks-rabbitmq.server
spring.rabbitmq.port=5672
spring.rabbitmq.addresses=${eureka.environment}.gks-rabbitmq.server:5672
spring.rabbitmq.virtual-host=gongkongsaas
```