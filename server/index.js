const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apolloserver',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// GraphQL schema
const typeDefs = gql`
  type User {
    id: Int
    name: String
    email: String
  }

  type Task {
    id: Int
    title: String
    description: String
    user_id: Int
    createdAt: String
  }

  type Query {
    users: [User]
    tasks: [Task]
    searchUsers(query: String): [User]
    searchTasks(query: String): [Task]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createTask(title: String!, description: String!, user_id: Int!): Task
    deleteTask(id: Int!): Task
    editTask(id: Int!, title: String, description: String, user_id: Int): Task
  }
`;


// ... (existing code)

// Resolvers
const resolvers = {
    Query: {
      users: () => {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM users', (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },
      tasks: () => {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM tasks', (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },
      searchTasks: (_, { query }) => {
        return new Promise((resolve, reject) => {
          if (!query) {
            // If no search query provided, return all tasks
            connection.query('SELECT * FROM tasks', (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
            });
          } else {
            // Perform a case-insensitive search on multiple columns
            connection.query(
              'SELECT * FROM tasks WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ?',
              [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`],
              (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              }
            );
          }
        });
      },
      
  
    },
    Mutation: {
      createUser: (_, args) => {
        return new Promise((resolve, reject) => {
          const { name, email } = args;
          connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
            if (err) {
              reject(err);
            } else {
              // Fetch the newly created user
              connection.query('SELECT * FROM users WHERE id = ?', [results.insertId], (err, user) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(user[0]);
                }
              });
            }
          });
        });
      },
      createTask: (_, args) => {
        return new Promise((resolve, reject) => {
          const { title, description,user_id } = args;
          connection.query('INSERT INTO tasks (title, description,user_id) VALUES (?, ?,?)', [title, description,user_id], (err, results) => {
            if (err) {
              reject(err);
            } else {
              connection.query('SELECT * FROM tasks WHERE id = ?', [results.insertId], (err, task) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(task[0]);
                }
              });
            }
          });
        });
      },
      deleteTask: (_, { id }) => {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
            if (err) {
              reject(err);
            } else {
              connection.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(task[0]);
                }
              });
            }
          });
        });
      },
      editTask: (_, args) => {
        const { id, title, description, user_id } = args;
        return new Promise((resolve, reject) => {
          connection.query(
            'UPDATE tasks SET title = ?, description = ?, user_id = ? WHERE id = ?',
            [title, description, user_id, id],
            (err) => {
              if (err) {
                reject(err);
              } else {
                connection.query('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(task[0]);
                  }
                });
              }
            }
          );
        });
      },


    },
  };
  
// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
