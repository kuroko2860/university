DROP DATABASE university;
CREATE DATABASE university;
USE university;
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1, 1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL
);
CREATE TABLE universities (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(20),
    fax VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(100),
    logo VBINARY(255)
);
CREATE TABLE campuses (
    campus_id INT PRIMARY KEY IDENTITY(1, 1),
    campus_name VARCHAR(255),
    campus_address VARCHAR(255),
    university_id INT,
    FOREIGN KEY (university_id) REFERENCES universities(id)
);
CREATE TABLE majors (
    major_id INT PRIMARY KEY IDENTITY(1, 1),
    major_name VARCHAR(255),
    major_quota INT,
    university_id INT,
    FOREIGN KEY (university_id) REFERENCES universities(id)
);
CREATE TABLE administrative_boards (
    board_id INT PRIMARY KEY IDENTITY(1, 1),
    board_name VARCHAR(255),
    board_position VARCHAR(100),
    university_id INT,
    FOREIGN KEY (university_id) REFERENCES universities(id)
);
CREATE TABLE university_searches (
    search_id INT PRIMARY KEY IDENTITY(1, 1),
    university_id INT,
    search_time DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (university_id) REFERENCES universities(id),
);
create table major_searches (
    search_id INT PRIMARY KEY IDENTITY(1, 1),
    major_name VARCHAR(255),
    search_time DATETIME DEFAULT GETDATE(),
);
CREATE TABLE favorite_lists (
    list_id INT PRIMARY KEY IDENTITY(1, 1),
    user_id INT,
    major_name VARCHAR(255),
    university_id INT,
    FOREIGN KEY (university_id) REFERENCES universities(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);