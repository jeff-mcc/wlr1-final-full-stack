DROP TABLE IF EXISTS wlr1_product_cart_junction;
DROP TABLE IF EXISTS wlr1_carts;
DROP TABLE IF EXISTS wlr1_products;
DROP TABLE IF EXISTS wlr1_users;

CREATE TABLE wlr1_users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(2000)
);

CREATE TABLE wlr1_products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100),
  product_description VARCHAR(1000),
  product_image VARCHAR(2000)
);

CREATE TABLE wlr1_carts (
  cart_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES wlr1_users(user_id),
  active BOOLEAN
);

CREATE TABLE wlr1_product_cart_junction (
  product_cart_id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES wlr1_carts(cart_id),
  product_id INT REFERENCES wlr1_products(product_id),
  quantity INT
);