--=========================TABLE STRUCTURE============================
--Drop database if exists
DROP DATABASE IF EXISTS bamazon_db;

--Create database
CREATE database bamazon_db;

--Use Database
USE bamazon_db;

--Create table
CREATE TABLE products (

--Set columns
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY(item_id)
);

SELECT * FROM products;

