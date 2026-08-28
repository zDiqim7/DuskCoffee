-- USE duskcoffee_db;

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
