DROP DATABASE IF EXISTS uncovery;
CREATE DATABASE uncovery;

SET foreign_key_checks=0;

USE uncovery;

CREATE TABLE marks (
  id int(5) AUTO_INCREMENT,
  PRIMARY KEY (id),
  x float(10, 6),
  y float(10, 6),
  z float(10, 6),
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
  messageId int(5) NULL,
  commentId int(5) NULL,
  userToken VARCHAR(255),
  FOREIGN KEY (messageId) REFERENCES messages(id),
  FOREIGN KEY (userToken) REFERENCES users(token)
);

CREATE TABLE messages (
  id int(5) AUTO_INCREMENT,
  messageString text,
  image varchar(255),
  score int(5) DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE comments (
  id int(5) AUTO_INCREMENT,
  commentString text,
  messageId int(5),
  PRIMARY KEY (id),
  FOREIGN KEY (messageId) REFERENCES messages(id)
);

CREATE TABLE votes (
  id int(5) AUTO_INCREMENT,
  PRIMARY KEY(id),
  userToken VARCHAR(255),
  messageId int(5) NULL,
  commentId int(5) NULL,
  FOREIGN KEY (userToken) REFERENCES users(token),
  FOREIGN KEY (messageId) REFERENCES messages(id)
);

CREATE TABLE users (
  token VARCHAR(255),
  PRIMARY KEY(token)
);
