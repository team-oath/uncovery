DROP DATABASE IF EXISTS uncovery;
CREATE DATABASE uncovery
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

SET foreign_key_checks=0;

USE uncovery;

SET NAMES utf8mb4;

CREATE TABLE marks (
  id int(5) AUTO_INCREMENT,
  PRIMARY KEY (id),
  x float(10, 6) NOT NULL,
  y float(10, 6) NOT NULL,
  z float(10, 6) NOT NULL,
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
  messageId int(5) NULL,
  commentId int(5) NULL,
  userToken VARCHAR(191),
  FOREIGN KEY (messageId) REFERENCES messages(id),
  FOREIGN KEY (commentId) REFERENCES comments(id),
  FOREIGN KEY (userToken) REFERENCES users(token)
);

CREATE TABLE messages (
  id int(5) AUTO_INCREMENT,
  userToken VARCHAR(255),
  messageString text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  image VARCHAR(255),
  imageH int(5),
  imageW int(5),
  score int(5) DEFAULT 0,
  PRIMARY KEY (id)
) CHARACTER SET utf8mb4;

CREATE TABLE comments (
  id int(5) AUTO_INCREMENT,
  commentString text NOT NULL,
  messageId int(5),
  PRIMARY KEY (id),
  FOREIGN KEY (messageId) REFERENCES messages(id)
);

CREATE TABLE votes (
  id int(5) AUTO_INCREMENT,
  PRIMARY KEY(id),
  userToken VARCHAR(191) NOT NULL,
  messageId int(5) NULL,
  commentId int(5) NULL,
  FOREIGN KEY (userToken) REFERENCES users(token),
  FOREIGN KEY (messageId) REFERENCES messages(id),
  FOREIGN KEY (commentId) REFERENCES comments(id),
  UNIQUE KEY (userToken, messageId),
  UNIQUE KEY (userToken, commentId)
);

CREATE TABLE users (
  token VARCHAR(191),
  PRIMARY KEY(token),
  total_votes int(5) DEFAULT 0
);

DELIMITER //
CREATE TRIGGER vote_increment AFTER INSERT ON votes
FOR EACH ROW
  BEGIN
    UPDATE users SET users.total_votes = (users.total_votes + 1) WHERE users.token =
      (SELECT userToken FROM messages WHERE id = NEW.messageId);
    UPDATE messages SET messages.score = (messages.score + 10)
      WHERE messages.id = NEW.messageId;
  END;//
DELIMITER ;

DELIMITER //
CREATE TRIGGER vote_decrement AFTER DELETE ON votes
FOR EACH ROW
  BEGIN
    UPDATE users SET users.total_votes = (users.total_votes - 1) WHERE users.token =
      (SELECT userToken FROM messages WHERE id = OLD.messageId);
    UPDATE messages SET messages.score = (messages.score - 10)
      WHERE messages.id = OLD.messageId;
  END;//
DELIMITER ;
