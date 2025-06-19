SELECT FIO.TITLE                                             AS '客户名称',
       CONCAT('\t', FIOD.ORDER_NO)                           AS '订单号',
       FIOD.BRAND_NAME                                       AS '品牌',
       FIOD.SERIES_NAME                                      AS '系列',
       FIOD.PRODUCT_NAME                                     AS '产品',
       FIOD.MODEL_NAME                                       AS '型号',
       FIOD.MATERIAL_NO                                      AS '订货号',
       FIOD.BROAD_HEADING                                    AS '大类',
       FIOD.SUBCLASS                                         AS '小类',
       FIOD.CATEGORY_NAME                                    AS '品类',
       SISO.SHIP_COMPLETE_AT                                 AS '出库时间',
       FIOD.UNIT                                             AS '单位',
       FIOD.QUANTITY                                         AS '未开票数量',
       FORMAT(FIOD.PRICE / 100, 2)                           AS '销售单价',
       FORMAT(FIOD.TOTAL_AMOUNT / 100, 2)                    AS '未开票金额',
       FIOD.TAX_RATE / 100                                   AS '税率',
       CASE
           WHEN SISOD.MODEL_TYPE = 1 THEN
               0
           ELSE
                   IFNULL(
                           SISOD.AMEND_FIFO_PURCHASE_COST,
                           SISOD.FIFO_PURCHASE_COST
                       ) / 100
           END                                               AS '先进先出含税采购成本单价(元)',
       (CASE
            WHEN SISOD.MODEL_TYPE = 1 THEN
                0
            ELSE
                    IFNULL(
                            SISOD.AMEND_FIFO_PURCHASE_COST,
                            SISOD.FIFO_PURCHASE_COST
                        ) / 100
           END) * FIOD.QUANTITY                              AS '先进先出含税采购成本小计(元)',
       (CASE
            WHEN SISOD.MODEL_TYPE = 1 THEN
                0
            ELSE
                    IFNULL(
                            SISOD.AMEND_FIFO_PURCHASE_COST,
                            SISOD.FIFO_PURCHASE_COST
                        ) / 100
           END) / (1 + FIOD.TAX_RATE / 100)                  AS '先进先出未税采购成本单价(元)',
       ((CASE
             WHEN SISOD.MODEL_TYPE = 1 THEN
                 0
             ELSE
                     IFNULL(
                             SISOD.AMEND_FIFO_PURCHASE_COST,
                             SISOD.FIFO_PURCHASE_COST
                         ) / 100
           END) / (1 + FIOD.TAX_RATE / 100)) * FIOD.QUANTITY AS '先进先出未税采购成本小计(元)',
       CASE
           WHEN SISOD.MODEL_TYPE = 1 THEN
               0
           ELSE
                   IFNULL(
                           SISOD.AMEND_FIFO_ESTIMATED_COST,
                           SISOD.FIFO_ESTIMATED_COST
                       ) / 100
           END                                               AS '先进先出预估成本单价(元)',
       (CASE
            WHEN SISOD.MODEL_TYPE = 1 THEN
                0
            ELSE
                    IFNULL(
                            SISOD.AMEND_FIFO_ESTIMATED_COST,
                            SISOD.FIFO_ESTIMATED_COST
                        ) / 100
           END) * FIOD.QUANTITY                              AS '先进先出含税预估成本小计(元)',
       (CASE
            WHEN SISOD.MODEL_TYPE = 1 THEN
                0
            ELSE
                    IFNULL(
                            SISOD.AMEND_FIFO_ESTIMATED_COST,
                            SISOD.FIFO_ESTIMATED_COST
                        ) / 100
           END) / (1 + FIOD.TAX_RATE / 100)                  AS '先进先出未税预估成本单价(元)',
       ((CASE
             WHEN SISOD.MODEL_TYPE = 1 THEN
                 0
             ELSE
                     IFNULL(
                             SISOD.AMEND_FIFO_ESTIMATED_COST,
                             SISOD.FIFO_ESTIMATED_COST
                         ) / 100
           END) / (1 + FIOD.TAX_RATE / 100)) * FIOD.QUANTITY AS '先进先出未税预估成本小计(元)',
       FIOD.QUANTITY                                         AS '未开票数量',
       OOM.QUANTITY                                          AS '订单数量',
       FORMAT(OOM.TOTAL_AMOUNT / 100, 2)                     AS '订单金额',
       FORMAT(OOM.PROMOTION_DISCOUNT_AMOUNT / 100, 2)        AS '优惠',
       FORMAT(OOM.POINT_DISCOUNT_AMOUNT / 100, 2)            AS '积分',
       SISO.STOCK_OUT_NO                                     AS '出库单号',
       FIOD.STOCK_OUT_DETAIL_ID                              AS '出库明细id',
       FIOD.ORDER_MODEL_ID                                   AS '订单明细id',
       FIOD.STOCK_OUT_ID                                     AS '出库单id',
       FIOD.SM_ID,
       FIOD.MODEL_ID
FROM FNC.FNC_INVOICE_OUT FIO
         INNER JOIN FNC.FNC_INVOICE_OUT_DETAIL FIOD ON FIOD.INVOICE_OUT_ID = FIO.ID
         LEFT JOIN ODR.ODR_ORDER_MODEL OOM ON FIOD.ORDER_MODEL_ID = OOM.ID
         LEFT JOIN IVT.SAS_IVT_STOCK_OUT_DETAIL SISOD ON FIOD.STOCK_OUT_DETAIL_ID = SISOD.ID
         LEFT JOIN IVT.SAS_IVT_STOCK_OUT SISO ON SISOD.STOCK_OUT_ID = SISO.ID
WHERE FIO.STATUS IN (10, 20, 40)
  AND FIO.SHOP_ID = 9
  AND FIO.`CANCELLATION_TIME` IS NULL
  AND FIO.IS_DELETED = 0
  AND FIOD.IS_DELETED = 0
  AND FIO.`CREATED_AT` < '2023-05-01 00:00:00'
  AND FIOD.`LINK_ID` IS NULL
ORDER BY FIO.`ID` ASC;