/etc/init.d/mysql start
mysql -u root < ./server/db/schema.sql
./node_modules/.bin/forever ./node_modules/.bin/nodemon --exitcrash index.js
