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
  FOREIGN KEY (commentId) REFERENCES comments(id),
  FOREIGN KEY (userToken) REFERENCES users(token)
);

CREATE TABLE messages (
  id int(5) AUTO_INCREMENT,
  userToken VARCHAR(255),
  messageString text,
  image VARCHAR(255),
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
  FOREIGN KEY (messageId) REFERENCES messages(id),
  FOREIGN KEY (commentId) REFERENCES comments(id),
  UNIQUE KEY (userToken, messageId),
  UNIQUE KEY (userToken, commentId)
);

CREATE TABLE users (
  token VARCHAR(255),
  PRIMARY KEY(token),
  total_votes int(5) DEFAULT 0
);

-- If a message does not have a userToken then this will not work
DELIMITER //
CREATE TRIGGER vote_increment AFTER INSERT ON votes
FOR EACH ROW
  BEGIN
    UPDATE users SET users.total_votes = (users.total_votes + 1) WHERE users.token = 
      (SELECT userToken FROM messages WHERE id = NEW.messageId);
  END;//
DELIMITER ;
