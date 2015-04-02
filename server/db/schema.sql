CREATE DATABASE uncovery;

USE uncovery;

CREATE TABLE mark (
  mark_id int(5) AUTO_INCREMENT,
  loc_x float(10, 6),
  loc_y float(10, 6),
  loc_z float(10, 6),
  timestamp timestamp,
  UNIQUE (
    mark_id
  )
);

CREATE TABLE message (
  message_id int(5) AUTO_INCREMENT,
  message_string text,
  UNIQUE (
    message_id
  )
);
