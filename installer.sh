/etc/init.d/mysql start
mysql -u root < ./server/db/schema.sql
./node_modules/nodemon/bin/nodemon.js index.js
