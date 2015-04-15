USE uncovery;

INSERT INTO users (token) VALUES ('Archon');
INSERT INTO users (token) VALUES ('Carrier');
INSERT INTO users (token) VALUES ('Colossus');
INSERT INTO users (token) VALUES ('Dark Templar');
INSERT INTO users (token) VALUES ('Zealot');
INSERT INTO users (token) VALUES ('SCV');
INSERT INTO users (token) VALUES ('Raven');
INSERT INTO users (token) VALUES ('Marine');
INSERT INTO users (token) VALUES ('Ghost');
INSERT INTO users (token) VALUES ('Drone');
INSERT INTO users (token) VALUES ('Zergling');
INSERT INTO users (token) VALUES ('Broodling');

INSERT INTO messages (userToken, messageString) VALUES ('Zealot', 'State your will.');
INSERT INTO messages (userToken, messageString) VALUES ('Zealot', 'For Aiur!');
INSERT INTO messages (userToken, messageString) VALUES ('Dark Templar', 'Nach nagalas.');
INSERT INTO messages (userToken, messageString) VALUES ('SCV', 'SCV good to go, sir.');
INSERT INTO messages (userToken, messageString) VALUES ('Marine', 'You wanna piece of me, boy?');
INSERT INTO messages (userToken, messageString) VALUES ('Marine', 'Gimme something to shoot!');

INSERT INTO votes (userToken, messageId) VALUES ('Zealot', 1);
INSERT INTO votes (userToken, messageId) VALUES ('Zealot', 2);
INSERT INTO votes (userToken, messageId) VALUES ('Zealot', 3);
INSERT INTO votes (userToken, messageId) VALUES ('Marine', 1);
INSERT INTO votes (userToken, messageId) VALUES ('Ghost', 1);

INSERT INTO marks (userToken, messageId, x, y, z) VALUES ('Zealot', 1, 20, 20, 20);
INSERT INTO marks (userToken, messageId, x, y, z) VALUES ('Zealot', 2, 20, 20, 20);
INSERT INTO marks (userToken, messageId, x, y, z) VALUES ('Dark Templar', 3, 25, 25, 25);
INSERT INTO marks (userToken, messageId, x, y, z) VALUES ('SCV', 4, 10, 10, 10);
INSERT INTO marks (userToken, messageId, x, y, z) VALUES ('Marine', 5, 10, 10, 10);
INSERT INTO marks (userToken, messageId, x, y, z) VALUES ('Marine', 6, 10, 10, 10);
