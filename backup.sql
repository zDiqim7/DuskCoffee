CREATE DATABASE duskcoffee_db;
USE duskcoffee_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(50)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'Customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, image_url, category) 
VALUES 
('ARABICA', 'Smooth, aromatic, and mild flavor', 25000, 'src/img/products/p1.png', 'Coffee bean'),
('EXCELSA', 'Fruity, tart, and unique flavor', 28000, 'src/img/products/p2.png', 'Coffee bean'),
('ROBUSTA', 'Strong, bitter, and high in caffeine', 22000, 'src/img/products/p3.png', 'Coffee bean'),
('LIBERICA', 'Strong, bitter, and high in caffeine', 26000, 'src/img/products/p4.png', 'Coffee bean');

SELECT * FROM products;