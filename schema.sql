SET FOREIGN_KEY_CHECKS = 0;
CREATE DATABASE IF NOT EXISTS duskcoffee_db;
USE duskcoffee_db;

DROP TABLE IF EXISTS menu;
CREATE TABLE menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'beverage'
);

INSERT INTO menu (name, description, price, image_path, category) VALUES
('A Slice Cake', 'Delicious moist chocolate cake slice.', 4.00, 'img/menu/a-slice-cake.jpg', 'pastry'),
('A Strawberry Cake', 'Fresh strawberry cream cake.', 4.50, 'img/menu/a-strawberry-cake.jpg', 'pastry'),
('Caffè Americano', 'Espresso topped with hot water.', 5.00, 'img/menu/americano.png', 'beverage'),
('Bagel', 'A chewy, toasted ring-shaped bread roll, perfect plain or with spread.', 4.10, 'img/menu/bagel.jpg', 'food'),
('Cappuccino', 'Equal parts espresso, milk, and foam.', 5.50, 'img/menu/cappuccino.png', 'beverage'),
('Chicken Burger', 'Crispy chicken patty burger.', 6.50, 'img/menu/chicken-burger.jpg', 'food'),
('Cold Brew', 'Steeped cold coffee served on ice.', 5.00, 'img/menu/cold-brew.jpg', 'beverage'),
('Cookie', 'Freshly baked butter cookie with crisp edges and a soft center.', 4.00, 'img/menu/cookie.jpg', 'pastry'),
('Croissant', 'Flaky, buttery baked croissant.', 3.50, 'img/menu/croissant.jpg', 'pastry'),
('Decaf', 'Full-flavored brewed coffee with almost all of the caffeine naturally removed.', 6.20, 'img/menu/decaf.jpg', 'beverage'),
('Hot Chocolate', 'Rich dark chocolate with marshmallows.', 4.50, 'img/menu/hot-chocolate.jpg', 'beverage'),
('Iced Tea', 'Refreshing iced tea with lemon.', 2.50, 'img/menu/iced-tea.jpg', 'beverage'),
('Matcha Latte', 'Ceremonial matcha with steamed milk.', 4.50, 'img/menu/matcha-latte.png', 'beverage'),
('Pancake', 'Fluffy pancakes with maple syrup.', 5.00, 'img/menu/pancake.jpg', 'food'),
('Rissole', 'Crispy savory pastry pockets.', 5.50, 'img/menu/rissole.jpg', 'pastry'),
('Salad', 'Fresh mix of crisp greens, colorful vegetables, and a light dressing.', 7.00, 'img/menu/salad.jpg', 'food');


DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'beans'
);

INSERT INTO products (name, description, price, image_path, category) VALUES
('Arabica Single Origin', 'Pure single-estate coffee beans with natural fruity notes.', 29.90, 'img/products/arabica-single-origin.jpg', 'beans'),
('Arabica Light & Bright', 'Light roast profile with crisp acidity.', 24.90, 'img/products/arabica-light-bright.jpg', 'beans'),
('Arabica Decaf', 'Caffeine-free coffee for late night brew.', 26.90, 'img/products/arabica-decaf.jpg', 'beans'),
('Arabica Dorado', 'Balanced cup with sweet caramel finish and silky body.', 27.50, 'img/products/arabica-dorado.jpg', 'beans'),
('Robusta Espresso', 'Dark roast featuring bold cocoa bitterness.', 27.90, 'img/products/robusta-espresso.jpg', 'beans'),
('Robusta Morning Hustle', 'High-caffeine pack for an instant energy boost.', 22.90, 'img/products/robusta-morning.jpg', 'beans'),
('Robusta Kopi Tubruk', 'Classic fine-ground traditional powder.', 18.90, 'img/products/robusta-tubruk.jpg', 'beans'),
('Liberica Jackfruit', 'Exotic variety highlighting sweet ripe jackfruit aroma.', 35.90, 'img/products/liberica-jackfruit.jpg', 'beans'),
('Liberica Sweet Blend', 'Smooth blend crafted for a fragrant aroma.', 31.90, 'img/products/liberica-sweet.jpg', 'beans'),
('Liberica Cold Brew', '16-hour extracted concentrate bottle.', 28.90, 'img/products/liberica-coldbrew.jpg', 'beans'),
('Excelsa Tart Berry', 'Unique tart wild-berry flavor profile.', 32.90, 'img/products/excelsa-tart.jpg', 'beans'),
('Excelsa Mystic Blend', 'Bold bitter start with tart-sweet aftertaste.', 29.90, 'img/products/excelsa-mystic.jpg', 'beans'),
('Excelsa Coffee Pods', 'Modern home espresso machine pods.', 19.90, 'img/products/excelsa-pods.jpg', 'beans'),
('Signature Roast 01', 'Curated house roast for smooth and balanced cups.', 25.00, 'img/products/p1.png', 'beans'),
('Signature Roast 02', 'Clean, aromatic roast with mellow sweetness.', 26.50, 'img/products/p2.png', 'beans'),
('Signature Roast 03', 'Rich body and layered finish for everyday brewing.', 28.00, 'img/products/p3.png', 'beans'),
('Signature Roast 04', 'Full-bodied seasonal roast with deep cocoa notes.', 30.00, 'img/products/p4.png', 'beans');

-- 1. Hapus tabel lama yang strukturnya belum lengkap
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

INSERT INTO users (username, email, password_hash) 
VALUES 
('diqi', 'diqi@duskcoffee.com', '$2a$10$wK8adminhashsampletext'),
('customer1', 'buyer@gmail.com', '$2a$10$xL9userhashsampletext');


-- Orders tables
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(150),
  customer_email VARCHAR(150),
  customer_phone VARCHAR(50),
  phone VARCHAR(50),
  address TEXT,
  notes TEXT,
  mode VARCHAR(50),
  payment VARCHAR(50),
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  status ENUM('pending', 'paid', 'completed', 'cancelled') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS order_items;
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id VARCHAR(150),
  name VARCHAR(255),
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;