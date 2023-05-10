-- Segédállomány, hogy előkészítsünk egy MySQL adatbázist a példaprogramnak.
-- Futtatás konzolról (UNIX rendszeren): 
--     mysql -u root -p <setup.sql

-- az alábbi sor törli az adatbázist ha nem létezik
-- DROP DATABASE IF EXISTS webprog;

-- készít egy adatbázist
CREATE DATABASE IF NOT EXISTS webprog;

-- készít egy felhasználót, aki minden műveletet végrehajthat ezen adatbázisban
USE webprog;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';