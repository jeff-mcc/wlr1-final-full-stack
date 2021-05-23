UPDATE wlr1_product_cart_junction pc
SET quantity = $3
WHERE cart_id = $1 AND product_id = $2;

--copied from get_cart_items.sql, and used in delete_item_from_cart.sql. must update all files if the code changes
SELECT * FROM wlr1_product_cart_junction pc
JOIN wlr1_products p ON pc.product_id = p.product_id
WHERE pc.cart_id = $1
ORDER BY pc.product_id;