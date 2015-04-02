CREATE DATABASE uncovery;

USE uncovery;

CREATE TABLE marks (
  mark_id int(5) AUTO_INCREMENT,
  x float(10, 6),
  y float(10, 6),
  z float(10, 6),
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (
    mark_id
  )
);

CREATE TABLE messages (
  message_id int(5) AUTO_INCREMENT,
  message_string text,
  UNIQUE (
    message_id
  )
);
