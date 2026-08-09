CREATE DATABASE duskcoffee_db;
USE duskcoffee_db;
DROP TABLE IF EXISTS menu;

CREATE TABLE menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_path VARCHAR(255),
  category VARCHAR(50) DEFAULT 'beverage'
);

INSERT INTO menu (name, description, price, image_path, category) VALUES
('Croissant', 'Flaky, buttery baked croissant.', 3.50, 'img/menu/croissant.jpg', 'pastry'),
('Caffè Americano', 'Espresso topped with hot water.', 5.00, 'img/menu/americano.jpg', 'beverage'),
('Cappuccino', 'Equal parts espresso, milk, and foam.', 5.50, 'img/menu/cappuccino.jpg', 'beverage'),
('Matcha Latte', 'Ceremonial matcha with steamed milk.', 4.50, 'img/menu/matcha-latte.jpg', 'beverage'),
('Iced Tea', 'Refreshing iced tea with lemon.', 2.50, 'img/menu/iced-tea.jpg', 'beverage'),
('Rissole', 'Crispy savory pastry pockets.', 5.50, 'img/menu/rissole.jpg', 'pastry'),
('Hot Chocolate', 'Rich dark chocolate with marshmallows.', 4.50, 'img/menu/hot-chocolate.jpg', 'beverage'),
('Cold Brew', 'Steeped cold coffee served on ice.', 5.00, 'img/menu/cold-brew.jpg', 'beverage'),
('A Slice Cake', 'Delicious moist chocolate cake slice.', 4.00, 'img/menu/a-slice-cake.jpg', 'pastry'),
('Strawberry Cake', 'Fresh strawberry cream cake.', 4.50, 'img/menu/a-strawberry-cake.jpg', 'pastry'),
('Chicken Burger', 'Crispy chicken patty burger.', 6.50, 'img/menu/chicken-burger.jpg', 'food'),
('Pancake', 'Fluffy pancakes with maple syrup.', 5.00, 'img/menu/pancake.jpg', 'food');

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_path VARCHAR(255),
  category VARCHAR(50) DEFAULT 'beans'
);

INSERT INTO products (name, description, price, image_path, category) VALUES
('Arabica Single Origin', 'Pure single-estate coffee beans with natural fruity notes.', 29.90, 'img/products/arabica-single-origin.jpg', 'beans'),
('Arabica Light & Bright', 'Light roast profile with crisp acidity.', 24.90, 'img/products/arabica-light-bright.jpg', 'beans'),
('Arabica Decaf', 'Caffeine-free coffee for late night brew.', 26.90, 'img/products/arabica-decaf.jpg', 'beans'),
('Robusta Espresso', 'Dark roast featuring bold cocoa bitterness.', 27.90, 'img/products/robusta-espresso.jpg', 'beans'),
('Robusta Morning Hustle', 'High-caffeine pack for an instant energy boost.', 22.90, 'img/products/robusta-morning.jpg', 'beans'),
('Robusta Kopi Tubruk', 'Classic fine-ground traditional powder.', 18.90, 'img/products/robusta-tubruk.jpg', 'beans'),
('Liberica Jackfruit', 'Exotic variety highlighting sweet ripe jackfruit aroma.', 35.90, 'img/products/liberica-jackfruit.jpg', 'beans'),
('Liberica Sweet Blend', 'Smooth blend crafted for a fragrant aroma.', 31.90, 'img/products/liberica-sweet.jpg', 'beans'),
('Liberica Cold Brew', '16-hour extracted concentrate bottle.', 28.90, 'img/products/liberica-coldbrew.jpg', 'beans'),
('Excelsa Tart Berry', 'Unique tart wild-berry flavor profile.', 32.90, 'img/products/excelsa-tart.jpg', 'beans'),
('Excelsa Mystic Blend', 'Bold bitter start with tart-sweet aftertaste.', 29.90, 'img/products/excelsa-mystic.jpg', 'beans'),
('Excelsa Coffee Pods', 'Modern home espresso machine pods.', 19.90, 'img/products/excelsa-pods.jpg', 'beans');
