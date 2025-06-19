-- 导出商城数据
SELECT S.`NICK_NAME`                                        as 商城名称,
       S.`COMPANY_NAME`                                     as 公司名称,
       CASE S.`STATUS`
           WHEN 10 THEN '启用'
           WHEN 20 THEN '停用'
           WHEN 30 THEN '创建中'
           WHEN 40 THEN '创建失败'
           WHEN 50 THEN '制作证书中'
           ELSE '未知状态' END                              AS 启用状态,
       CASE SB.SHOP_TYPE WHEN 99 THEN 'SRM' ELSE '商户' END AS SHOP_TYPE_DESC,
       CASE SB.SOFTWARE_VERSION
           WHEN 'INVENTORY' THEN '进销存版'
           WHEN 'BASIC' THEN '基础版'
           WHEN 'PROFESSIONAL' THEN '专业版'
           WHEN 'FLAGSHIP' THEN '旗舰版'
           WHEN 'AUTHORIZED_AGENT' THEN '授权代理版'
           WHEN 'TRUSTEESHIP' THEN '托管版'
           WHEN 'CONSIGNMENT' THEN '寄售版'
           ELSE '未知版本' END                              AS 软件版本
FROM SHP.`SHP_SHOP` S
         LEFT JOIN SHP.SHP_SHOP_BASE_INFO SB ON S.ID = SB.SHOP_ID
WHERE S.`IS_DELETED` = 0;


SELECT SS.`NICK_NAME` AS 登记企业名称,
       SS.COMPANY_NAME AS 终端公司名称,
       SS.TAX_NUMBER AS 终端统一信用代码,
       SS.LEGAL_REPRESENTATIVE_NAME AS 终端经办人姓名,
       SS.ID_NUMBER AS 终端经办人身份证号,
       CASE SS.`STATUS` WHEN 10 THEN '启用' ELSE '停用' END
FROM SHP.`SHP_SHOP` SS
         LEFT JOIN SHP.SHP_SHOP_BASE_INFO SSBI ON SS.ID = SSBI.SHOP_ID
         LEFT JOIN SHP.SHP_INVOICE SI ON SS.COMPANY_ID = SI.COMPANY_ID AND SI.TYPE = 2
WHERE
`NICK_NAME` IN ('南京洲锐自动化系统有限公司'...)