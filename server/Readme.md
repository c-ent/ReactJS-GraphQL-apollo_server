npx sequelize-cli  migration:create --name create-tasks

run index.js
node index.js

migrate the migrations to db
npx sequelize-cli db:migrate

undo migrate 
npx sequelize-cli db:migrate:undo

