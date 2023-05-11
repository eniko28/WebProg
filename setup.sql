CREATE DATABASE IF NOT EXISTS webprog;

USE webprog;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';

CREATE TABLE IF NOT EXISTS felhasznalo (
  kod INT,
  nev VARCHAR(50) PRIMARY KEY
);

INSERT INTO felhasznalo (nev)
VALUES ('abcd1234'),
       ('efgh1234'),
       ('ijkl1234'),
       ('mnop1234'),
       ('rstz1234'),
       ('xqwy1234');
