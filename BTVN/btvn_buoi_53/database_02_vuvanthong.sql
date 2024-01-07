-- 1. Xem danh sách đơn hàng
-- Order status là trạng thái mới nhất được cập nhật

WITH RankedOrderStatus AS (
  SELECT
    os.*,
    ROW_NUMBER() OVER (PARTITION BY os.order_id ORDER BY os.created_at DESC) AS row_num
  FROM
    "OrderStatus" os
)
SELECT
  c.name AS customer_name,
  c.email AS customer_email,
  c.phone_number AS customer_phone_number,
  SUM(oi.quantity) AS total_product_quantity,
  o.total_amount AS total_order_amount,
  ros.detail AS order_status,
  o.order_date AS order_time
FROM
  "Order" o
JOIN
  "Customer" c ON o.customer_id = c.id
JOIN
  "OrderItem" oi ON o.id = oi.order_id
JOIN
  RankedOrderStatus ros ON o.id = ros.order_id AND ros.row_num = 1
GROUP BY
  o.id, c.name, c.email, c.phone_number, o.total_amount, ros.detail, o.order_date;


-- 2. Xem chi tiết đơn hàng

SELECT
  c.name AS customer_name,
  c.email AS customer_email,
  c.phone_number AS customer_phone_number,
  p.name AS product_name,
  p.sku AS product_sku,
  p.price AS product_price,
  oi.quantity AS product_quantity,
  oi.subtotal AS product_total,
  os.detail AS order_status,
  o.order_date AS order_time,
  o.updated_at AS last_updated
FROM
  "Order" o
JOIN
  "Customer" c ON o.customer_id = c.id
JOIN
  "OrderItem" oi ON o.id = oi.order_id
JOIN
  "Product" p ON oi.product_id = p.id
LEFT JOIN
  "OrderStatus" os ON o.id = os.order_id
WHERE
  o.id = 2;



