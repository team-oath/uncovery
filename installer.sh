service mysqld start
mysql -u root < ./server/db/schema.sql
node index.js
