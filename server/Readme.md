npx sequelize-cli  migration:create --name create-tasks

run index.js
node index.js

migrate the migrations to db
npx sequelize-cli db:migrate

undo migrate 
npx sequelize-cli db:migrate:undo

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Table for tasks
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


npm install jsonwebtoken bcrypt


mutation {
  createUser(
    name: "hi",
    email: "desc@mail.com",
    password: "1234"
  ) {
    name
    email
    password
  }
}

mutation {
  loginUser(email: "desc@mail.com", password: "1234") {
    token
    user {
      id
      name
      email
    }
  }
}