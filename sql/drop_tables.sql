-- Drop all tables and optional database for Ali app
USE ali_db;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS uploads;
DROP TABLE IF EXISTS home_banners;
DROP TABLE IF EXISTS viva_banners;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS=1;

-- Optional: drop the database
-- DROP DATABASE IF EXISTS ali_db;
