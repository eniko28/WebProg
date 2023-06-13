-- mysql -u root -p <setup.sql

CREATE DATABASE IF NOT EXISTS webprog;

USE webprog;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';
