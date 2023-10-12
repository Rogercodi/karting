CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    name VARCHAR(30),
    surname VARCHAR(50),
    contact VARCHAR(12),
    role_name VARCHAR(20),
    registerDate TIMESTAMP,
    last_login TIMESTAMP
);