CREATE DATABASE uncovery;

SET foreign_key_checks=0;

USE uncovery;

CREATE TABLE marks (
  id int(5) AUTO_INCREMENT,
  x float(10, 6),
  y float(10, 6),
  z float(10, 6),
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
  messageId int(5),
  FOREIGN KEY (messageId)
    REFERENCES messages(id),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id int(5) AUTO_INCREMENT,
  messageString text,
  PRIMARY KEY (id)
);
