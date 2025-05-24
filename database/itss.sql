-- Tạo bảng users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    verified_time TIMESTAMP,
    password VARCHAR(255) NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL,
    status INT NOT NULL,
    avatar VARCHAR(255),
    name VARCHAR(255),
    gender VARCHAR(255),
    address VARCHAR(255)
);

-- Tạo bảng ingredients
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(2555),
    description VARCHAR(255),
    status INT,
    create_at TIMESTAMP,
    update_at TIMESTAMP
    due_date TIMESTAMP,
);

-- Tạo bảng dish
CREATE TABLE dish (
    id SERIAL PRIMARY KEY,
    image VARCHAR(500),
    name VARCHAR(255) NOT NULL,
    descriptions TEXT,
    recipe_des TEXT NOT NULL,
    status INT,
    type VARCHAR(255) NOT NULL,
    create_at TIMESTAMP,
    update_at TIMESTAMP
);

-- Tạo bảng shopping
CREATE TABLE shopping (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE,
    create_at TIMESTAMP,
    status INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tạo bảng group_table
CREATE TABLE group_table (
    id SERIAL PRIMARY KEY,
    leader INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    create_at TIMESTAMP,
    update_at TIMESTAMP,
    FOREIGN KEY (leader) REFERENCES users(id)
);

-- Tạo bảng shopping_attribute
CREATE TABLE shopping_attribute (
    id SERIAL PRIMARY KEY,
    user_id INT,
    buy_at TIMESTAMP,
    status INT NOT NULL,
    expire TIMESTAMP,
    measure VARCHAR(10),
    quantity DECIMAL(10,0),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tạo bảng dish_attribute
CREATE TABLE dish_attribute (
    id SERIAL PRIMARY KEY,
    dish_id INT NOT NULL,
    expire TIMESTAMP,
    cook_status INT,
    quantity INT,
    shopping_id INT,
    cook_date TIMESTAMP,
    create_at TIMESTAMP,
    update_at TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dish(id),
    FOREIGN KEY (shopping_id) REFERENCES shopping(id)
);

-- Tạo bảng dish_ingredients
CREATE TABLE dish_ingredients (
    id SERIAL PRIMARY KEY,
    dish_id INT NOT NULL,
    ingredients_id INT NOT NULL,
    FOREIGN KEY (dish_id) REFERENCES dish(id),
    FOREIGN KEY (ingredients_id) REFERENCES ingredients(id)
);

-- Tạo bảng group_member
CREATE TABLE group_member (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES group_table(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tạo bảng group_shopping
CREATE TABLE group_shopping (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    shopping_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES group_table(id),
    FOREIGN KEY (shopping_id) REFERENCES shopping(id)
);

-- Tạo bảng favorite
CREATE TABLE favorite (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (recipe_id) REFERENCES dish(id)
);

-- Tạo bảng fridge
CREATE TABLE fridge (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    group_id INT,
    user_id INT,
    FOREIGN KEY (group_id) REFERENCES group_table(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tạo bảng fridge_ingredients
CREATE TABLE fridge_ingredients (
    id SERIAL PRIMARY KEY,
    fridge_id INT,
    ingredients_id INT,
    quantity INT,
    FOREIGN KEY (fridge_id) REFERENCES fridge(id),
    FOREIGN KEY (ingredients_id) REFERENCES ingredients(id)
);