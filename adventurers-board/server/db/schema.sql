-- DROP DATABASE
DROP DATABASE IF EXISTS dnd_db;

-- CREATE DATABASE
CREATE DATABASE dnd_db;

-- CREATE USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- CREATE CHARACTERS TABLE
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to link to users
    name VARCHAR(255) NOT NULL, 
    class VARCHAR(50) NOT NULL, 
    level INT NOT NULL, 
    background VARCHAR(100) NOT NULL, 
    race VARCHAR(50) NOT NULL,
    alignment VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    height VARCHAR(25) NOT NULL,
    skin VARCHAR(30) NOT NULL,
    hair VARCHAR(30) NOT NULL,

    strength INT NOT NULL,
    dexterity INT NOT NULL,
    constitution INT NOT NULL,
    intelligence INT NOT NULL,
    wisdom INT NOT NULL,
    charisma INT NOT NULL
);

-- CREATE SPELLS TABLE
CREATE TABLE spells (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES characters(id) ON DELETE CASCADE, -- Foreign key to link to characters
    name VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    description TEXT NOT NULL
);

-- CREATE INVENTORY TABLE
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES characters(id) ON DELETE CASCADE, -- Foreign key to link to characters
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL
);