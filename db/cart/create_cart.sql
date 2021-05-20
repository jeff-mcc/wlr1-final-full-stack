INSERT INTO wlr1_carts (user_id,active)
VALUES ($1, TRUE) RETURNING cart_id;