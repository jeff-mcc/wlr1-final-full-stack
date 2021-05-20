SELECT cart_id FROM wlr1_carts
WHERE user_id = $1 AND active = TRUE;