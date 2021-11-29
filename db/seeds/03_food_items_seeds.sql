-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Nankotsu Yakitori', 'Nankotsu Yakitori','https://cdn.tasteatlas.com/images/dishes/453d9154df95465b88b3eb096140faae.jpg',10000,1300);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Futomaki', 'Futomaki','https://thehappyfoodie.co.uk/wp-content/uploads/2021/08/sushi_at_home_2_53_img_s900x0_c2219x1297_l0x544.jpg',9000,150);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Tsukune Yakitori', 'Tsukune Yakitori','https://cdn.tasteatlas.com/images/dishes/a3228690c30f4b2cbb48073cbc2e36cd.jpg?w=600&h=450',7500,300);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Tori Katsu', 'Tori Katsu','https://static01.nyt.com/images/2021/05/23/dining/kc-chicken-katsu/merlin_185308080_a60a6563-292e-4f52-a33b-386113aca0b2-articleLarge.jpg',5500,50);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Chawanmushi', 'Chawanmushi Receipe','https://www.chopstickchronicles.com/wp-content/uploads/2016/08/Chawanmushi-2-2-500x500.jpg',7500,40);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Okonomiyaki', 'Okonomiyaki','https://fullofplants.com/wp-content/uploads/2017/10/the-best-vegan-okonomiyaki-gluten-free-with-jackfruit-japanese-inspired-thumb-500x375.jpg',6500,60);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Temaki Sushi', 'Temaki Sushi','https://iheartumami.com/wp-content/uploads/2019/09/Temaki-Sushi-Low-Carb-Tuna-Temaki-1-500x500.jpg',10000,90);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Katsudon', 'Katsudon','https://www.justonecookbook.com/wp-content/uploads/2020/05/Baked-Katsudon-9603-I-500x500.jpg',8000,45);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Ebi Furai', 'Ebi Furai','https://www.justonecookbook.com/wp-content/uploads/2020/04/Ebi-Fry-Fried-Shrimp-1185-I-1.jpg',7000,65);
-- INSERT INTO food_items (name,description,picture_url,price,prep_time) VALUES ('Miso Ramen', 'Miso Ramen','https://www.justonecookbook.com/wp-content/uploads/2019/05/Miso-Ramen-I-500x500.jpg',8500,70);

INSERT INTO food_items (name, description, type, picture_url, price, prep_time)
VALUES ('Miso Soup',        'Japanese soybean paste soup with mushrooms',      'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/food_misoshiru_nameko.png', 300, 5),
('Namerou',          'Minced fish with seasoning',                             'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/food_namerou.png',          500, 5),
('Seaweed Salad',    'Seaweed and cucumber salad   ',                          'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/food_sunomomo.png',         500, 5),
('Edamame',          'Steamed soybeans with sea salt',                         'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/food_edamame.png',          600, 5),
('Chicken Karaage',  'Deep fried chicken marinated with soy sauce and spices', 'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/food_karaage_lemon.png',    800, 5),
('Takoyaki',         'Round balls of batter with grilled octopus',             'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/takoyaki_fune.png',         800, 5),
('Assorted Tempura', 'Deep fried mix of seasonal vegetables and shrimp',       'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/food_tenpura.png',          1000, 10),
('Chicken Yakitori', 'Grilled skewered chicken',                               'appetizer', 'https://github.com/miged/food-pickup/tree/master/public/images/yakitori_momo.png',         800, 5),

('Ume Set',   '6 pieces assorted sushi',  'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/nigirizushi_moriawase.png', 1000, 10),
('Take Set',  '9 pieces assorted sushi',  'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/nigirizushi_moriawase.png', 1500, 15),
('Matsu Set', '13 pieces assorted sushi', 'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/nigirizushi_moriawase.png', 2000, 15),
('Tamago',    'Sliced omelette',          'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/sushi_tamago.png',          400, 5),
('Toro',      'Fatty tuna',               'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/sushi_chutoro.png',         500, 5),
('Otoro',     'Extra fatty tuna',         'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/sushi_ootoro.png',          800, 5),
('Ebi',       'Shrimp',                   'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/sushi_ebi.png',             500, 5),
('Salmon',    'Salmon',                   'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/sushi_aburi_salmon.png',    500, 5),
('Tai',       'Tilapia',                  'sushi', 'https://github.com/miged/food-pickup/tree/master/public/images/sushi_tai.png',             500, 5),

('Soba',             'Warm soba served in broth',                             'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 500, 10),
('Kakiage Soba',     'Warm soba served in broth with fried mixed vegetables', 'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 600, 10),
('Tsukimi Soba',     'Warm soba served in broth topped with an egg',          'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 600, 10),
('Matcha Mori Soba', 'Cold matcha soba served cold with dipping sauce',       'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 500, 10),
('Udon',             'Hot udon soup',                                         'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 500, 10),
('Zaru Udon',        'Cold udon noodles with dipping sauce',                  'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 500, 10),
('Simmered Udon',    'Hot udon soup with vegetables and egg',                 'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 600, 10),
('Nikusui Udon',     'Hot udon soup with beef',                               'noodles', 'https://github.com/miged/food-pickup/tree/master/public/images/', 600, 10),

('Chicken Don',    'Grilled chicken with egg and vegetables on rice', 'donburi', 'https://github.com/miged/food-pickup/tree/master/public/images/', 1500, 15),
('Beef Don',       'Beef with egg and vegetables on rice',            'donburi', 'https://github.com/miged/food-pickup/tree/master/public/images/', 1800, 15),
('Pork Katsu Don', 'Breaded fried pork cutlet on rice',               'donburi', 'https://github.com/miged/food-pickup/tree/master/public/images/', 1800, 15),
('Unagi Don',      'Blow-torched barbecued eel on rice',              'donburi', 'https://github.com/miged/food-pickup/tree/master/public/images/', 2000, 15),
('Oyako Don',      'Chicken and egg simmered in sauce over rice',     'donburi', 'https://github.com/miged/food-pickup/tree/master/public/images/', 1500, 15),
('Yasai Ten Don',  'Tempura vegetables with sauce over rice',         'donburi', 'https://github.com/miged/food-pickup/tree/master/public/images/', 1500, 15);
