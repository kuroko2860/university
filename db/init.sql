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
    logo VARCHAR(255)
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
    major_group VARCHAR(255),
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
CREATE TABLE searches (
    search_id INT PRIMARY KEY IDENTITY(1, 1),
    university_id INT,
    major_id INT,
    search_time DATETIME,
    FOREIGN KEY (university_id) REFERENCES universities(id),
    FOREIGN KEY (major_id) REFERENCES majors(major_id)
);
CREATE TABLE favorite_lists (
    list_id INT PRIMARY KEY IDENTITY(1, 1),
    user_id INT,
    university_id INT,
    FOREIGN KEY (university_id) REFERENCES universities(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Generate more data for Campuses table
INSERT INTO campuses (campus_name, campus_address, university_id)
VALUES ('sample_campus_1', '111_university_st', 1),
    ('sample_campus_2', '222_college_ave', 2),
    ('sample_campus_3', '333_school_rd', 3),
    ('sample_campus_4', '444_academy_blvd', 4),
    ('sample_campus_5', '555_education_st', 5),
    ('sample_campus_6', '777_college_rd', 1),
    ('sample_campus_7', '222_university_ave', 2),
    ('sample_campus_8', '444_school_st', 3),
    ('sample_campus_9', '888_academy_blvd', 4),
    ('sample_campus_10', '666_education_st', 5),
    ('sample_campus_11', '123_campus_rd', 1),
    ('sample_campus_12', '456_campus_blvd', 2),
    ('sample_campus_13', '789_college_ave', 3),
    ('sample_campus_14', '321_school_st', 4),
    ('sample_campus_15', '555_university_blvd', 5),
    ('sample_campus_16', '777_college_rd', 1),
    ('sample_campus_17', '222_university_ave', 2),
    ('sample_campus_18', '444_school_st', 3),
    ('sample_campus_19', '888_academy_blvd', 4),
    ('sample_campus_20', '666_education_st', 5);
-- Generate more data for Majors table
INSERT INTO majors (
        major_name,
        major_group,
        major_quota,
        university_id
    )
VALUES ('sample_major_1', 'group_1', 50, 1),
    ('sample_major_2', 'group_2', 40, 2),
    ('sample_major_3', 'group_3', 30, 3),
    ('sample_major_4', 'group_4', 20, 4),
    ('sample_major_5', 'group_5', 10, 5),
    ('sample_major_6', 'group_6', 50, 1),
    ('sample_major_7', 'group_7', 40, 2),
    ('sample_major_8', 'group_8', 30, 3),
    ('sample_major_9', 'group_9', 20, 4),
    ('sample_major_10', 'group_10', 10, 5),
    ('sample_major_11', 'group_11', 50, 1),
    ('sample_major_12', 'group_12', 40, 2),
    ('sample_major_13', 'group_13', 30, 3),
    ('sample_major_14', 'group_14', 20, 4),
    ('sample_major_15', 'group_15', 10, 5),
    ('sample_major_16', 'group_16', 50, 1),
    ('sample_major_17', 'group_17', 40, 2),
    ('sample_major_18', 'group_18', 30, 3),
    ('sample_major_19', 'group_19', 20, 4),
    ('sample_major_20', 'group_20', 10, 5);
-- Generate more data for AdministrativeBoards table
INSERT INTO administrative_boards (board_name, board_position, university_id)
VALUES ('sample_board_1', 'principal', 1),
    ('sample_board_2', 'dean', 2),
    ('sample_board_3', 'headmaster', 3),
    ('sample_board_4', 'director', 4),
    ('sample_board_5', 'chancellor', 5),
    ('sample_board_6', 'principal', 1),
    ('sample_board_7', 'dean', 2),
    ('sample_board_8', 'headmaster', 3),
    ('sample_board_9', 'director', 4),
    ('sample_board_10', 'chancellor', 5),
    ('sample_board_11', 'principal', 1),
    ('sample_board_12', 'dean', 2),
    ('sample_board_13', 'headmaster', 3),
    ('sample_board_14', 'director', 4),
    ('sample_board_15', 'chancellor', 5),
    ('sample_board_16', 'principal', 1),
    ('sample_board_17', 'dean', 2),
    ('sample_board_18', 'headmaster', 3),
    ('sample_board_19', 'director', 4),
    ('sample_board_20', 'chancellor', 5);