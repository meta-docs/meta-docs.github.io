-- 付款单
SELECT MAX(FPPB.PAY_TIME)      '付款时间',
       CS.NAME              AS '供应商',
       FPPB.PURCHASE_PAY_NO AS '付款单号',
       SE.REALNAME          AS '制单人',
       COUNT(*)                明细行数
FROM PFNC.FNC_PURCHASE_PAYMENT_BILL FPPB
         LEFT JOIN PFNC.FNC_PURCHASE_PAYMENT_BILL_DETAIL FPPBD ON FPPB.ID = FPPBD.PAYMENT_BILL_ID
         LEFT JOIN CST.CST_SUPPLIER CS ON FPPB.SUPPLIER_ID = CS.ID
         LEFT JOIN SHP.SHP_EMPLOYEE SE ON SE.ID = FPPB.CREATED_BY
WHERE FPPB.IS_DELETED = 0
  AND FPPBD.IS_DELETED = 0
  AND FPPB.PAY_TIME BETWEEN '2023-06-01 00:00:00' AND '2023-07-01 00:00:00'
GROUP BY FPPB.PURCHASE_PAY_NO,
         CS.NAME,
         SE.REALNAME;


-- 收票单
SELECT MAX(FII.RECEIVE_TIME) '收票受理时间',
       CS.NAME           AS  '供应商',
       FII.INVOICE_IN_NO AS  '收票单号',
       SE.REALNAME       AS  '制单人',
       COUNT(*)              明细行数
FROM PFNC.FNC_INVOICE_IN FII
         LEFT JOIN PFNC.FNC_INVOICE_IN_DETAIL FIID ON FII.ID = FIID.INVOICE_IN_ID
         LEFT JOIN CST.CST_SUPPLIER CS ON FII.SUPPLIER_ID = CS.ID
         LEFT JOIN SHP.SHP_EMPLOYEE SE ON SE.ID = FII.CREATED_BY
WHERE FII.IS_DELETED = 0
  AND FIID.IS_DELETED = 0
  AND FII.RECEIVE_TIME BETWEEN '2023-06-01 00:00:00' AND '2023-07-01 00:00:00'
GROUP BY FII.INVOICE_IN_NO,
         CS.NAME,
         SE.REALNAME