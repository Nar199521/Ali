USE ali_db;

-- Sample users
INSERT INTO users (username, email, password) VALUES
('alice', 'alice@example.com', 'password_hash_1'),
('bob', 'bob@example.com', 'password_hash_2');

-- Sample sellers (associate with user id 2)
INSERT INTO sellers (user_id, store_name, business_email) VALUES
(2, 'Bob\'s Shop', 'sellerbob@example.com');

-- Sample categories
INSERT INTO categories (name, image_url) VALUES
('Electronics', 'https://example.com/images/categories/electronics.jpg'),
('Clothing', 'https://example.com/images/categories/clothing.jpg');

-- Sample products
INSERT INTO products (seller_id, category_id, name, description, price, image_url, stock_quantity) VALUES
(1, 1, 'Wireless Headphones', 'High quality wireless headphones', 59.99, 'https://example.com/images/products/headphones.jpg', 50),
(1, 2, 'T-Shirt', 'Comfortable cotton t-shirt', 12.5, 'https://example.com/images/products/tshirt.jpg', 200);

-- Sample product images
INSERT INTO product_images (product_id, url, alt_text) VALUES
(1, 'https://example.com/images/products/headphones-1.jpg', 'Headphones front'),
(1, 'https://example.com/images/products/headphones-2.jpg', 'Headphones side');

-- Sample uploads
INSERT INTO uploads (user_id, filename, url, mime_type, size) VALUES
(1, 'profile-alice.jpg', 'https://example.com/uploads/profile-alice.jpg', 'image/jpeg', 12345);

-- Sample banners
INSERT INTO home_banners (title, image_url, subtitle, button_text, button_link, background_color) VALUES
('Welcome Sale', 'https://example.com/images/banners/sale.jpg', 'Up to 50% off', 'Shop Now', '/products', '#ffffff');

INSERT INTO viva_banners (title, image_url, subtitle, button_text, button_link, background_color) VALUES
('Viva Promo', 'https://example.com/images/banners/viva.jpg', 'Limited time', 'Learn More', '/viva', '#000000');

-- Sample order and order items
INSERT INTO orders (user_id, total, currency, status) VALUES
(1, 72.49, 'BDT', 'completed');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 59.99),
(1, 2, 1, 12.5);
