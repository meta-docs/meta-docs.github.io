-- 供应商余额记录

SELECT FSA.BALANCE_AVAILABLE                                                  AS '供应商可用余额',
       FSA.BALANCE_FROZEN                                                     AS '供应商余额冻结',
       CASE FSBH.IN_OUT WHEN 1 THEN '收入' WHEN 2 THEN '支出' ELSE '未知' END AS '收支',
       CASE FSBH.SUB_ACTION
           WHEN 0 THEN '其他'
           WHEN 1 THEN '承兑汇票'
           WHEN 2 THEN '现金'
           WHEN 3 THEN '银行汇款'
           WHEN 4 THEN '供应商返点'
           WHEN 5 THEN '采购退货款'
           WHEN 11 THEN '支付采购付款单'
           WHEN 12 THEN '退回采购付款单'
           ELSE '未知' END                                                    AS '详细业务类型',
       FSBH.REFERENCE_NO                                                      AS '关联单号',
       FSBH.PRE_BALANCE_AVAILABLE                                             AS '修改前可用余额',
       FSBH.BALANCE_CHANGE                                                    AS '余额变更',
       FSBH.BALANCE_FROZEN                                                    AS '余额冻结',
       FSBH.BALANCE_AVAILABLE                                                 AS '当前可用余额',
       FSBH.CREATED_AT                                                        AS '业务时间'
FROM FNC.FNC_SUPPLIER_BALANCE_HISTORY FSBH
         LEFT JOIN FNC.FNC_SUPPLIER_ACCOUNT FSA ON FSA.ID = FSBH.ACCOUNT_ID
WHERE FSBH.IS_DELETED = 0
  AND FSBH.SHOP_ID = 769
  AND FSBH.SUPPLIER_ID = 109034;

-- 供应商预存款明细
SELECT FSBH.CREATED_AT                                                               AS '收支时间',
       CASE FSBH.IN_OUT WHEN 1 THEN '收入' WHEN 2 THEN '支出' END                    AS '收入/支出',
       CASE FSBH.ACTION WHEN 1 THEN '充值' WHEN 2 THEN '退款' WHEN 3 THEN '支付' END AS '单据类型',
       CASE FSBH.SUB_ACTION
           WHEN 0 THEN '其他'
           WHEN 1 THEN '承兑汇票'
           WHEN 2 THEN '现金'
           WHEN 3 THEN '银行汇款'
           WHEN 4 THEN '供应商返点'
           WHEN 5 THEN '采购退货款'
           WHEN 11 THEN '支付采购付款单'
           WHEN 12 THEN '退回采购付款单' END                                         AS '单据说明',
       FSBH.REFERENCE_NO                                                             AS '单据编号',
       FSBH.PRE_BALANCE_AVAILABLE / 100                                              AS '变更前可用(元)',
       FSBH.BALANCE_CHANGE / 100                                                     AS '支出/收入(元)',
       FSBH.BALANCE_AVAILABLE / 100                                                  AS '变更后可用(元)',
       SE.REALNAME                                                                   AS '操作人',
       FSBH.REMARK                                                                   AS '备注'
FROM FNC.FNC_SUPPLIER_BALANCE_HISTORY FSBH
         LEFT JOIN SHP.SHP_EMPLOYEE SE ON FSBH.CREATED_BY = SE.ID
WHERE FSBH.IS_DELETED = 0
  AND FSBH.SHOP_ID = 9
  AND FSBH.SUPPLIER_ID = 27
ORDER BY FSBH.ID DESC;