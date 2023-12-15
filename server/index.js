require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// MySQL connection check
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
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
    password: String
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
    tasks(query: String, user_id: Int): [Task]
    searchUsers(query: String): [User]

  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    createUser(name: String!, email: String!, password:String!): User
    createTask(title: String!, description: String!, user_id: Int!): Task
    deleteTask(id: Int!): Task
    editTask(id: Int!, title: String, description: String, user_id: Int): Task
    loginUser(email: String!, password: String!): AuthPayload
    logoutUser: Boolean
  }


`;

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
      tasks: (_, { query, user_id }) => {
        return new Promise((resolve, reject) => {
          let queryCondition = '1'; // Default condition to return all tasks
      
          if (user_id) {
            // If user_id is provided, filter tasks by user_id
            queryCondition = `user_id = ${user_id}`;
          }
      
          if (query) {
            // If a search query is provided, add it to the condition
            queryCondition += ` AND (LOWER(title) LIKE '%${query.toLowerCase()}%' OR LOWER(description) LIKE '%${query.toLowerCase()}%')`;
          }
      
          // Perform the SQL query
          connection.query(`SELECT * FROM tasks WHERE ${queryCondition}`, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },
    },
    Mutation: {
      createUser: (_, args) => {
        return new Promise((resolve, reject) => {
          const { name, email, password } = args;
      
          // Validate name
          const nameRegex = /^[a-zA-Z\s]*$/;
          if ( !nameRegex.test(name)) {
            reject(new Error('Name must contain only letters and spaces'));
            return;
          }
      
          // Validate email
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          if (!email || !emailRegex.test(email)) {
            reject(new Error('Invalid email'));
            return;
          }
      
          // Validate password
          if (!password || password.length < 8) {
            reject(new Error('Password must be at least 8 characters long'));
            return;
          }
      
          // Check if email already exists
          connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            (err, results) => {
              if (err) {
                reject(err);
              } else if (results.length > 0) {
                reject(new Error('Email already in use'));
              } else {
                // Hash the password
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                  if (err) {
                    reject(err);
                  } else {
                    connection.query(
                      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                      [name, email, hashedPassword],
                      (err, results) => {
                        if (err) {
                          reject(err);
                        } else {
                          connection.query(
                            'SELECT * FROM users WHERE id = ?',
                            [results.insertId],
                            (err, user) => {
                              if (err) {
                                reject(err);
                              } else {
                                resolve(user[0]);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        });
      },
      createTask: (_, args) => {
        return new Promise((resolve, reject) => {
          const { title, description, user_id } = args;
      
          // Validate title
          if (!title || title.trim().length === 0) {
            reject(new Error('Title cannot be empty'));
            return;
          }
      
          // Validate description
          if (!description || description.trim().length === 0) {
            reject(new Error('Description cannot be empty'));
            return;
          }
      
          connection.query('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, user_id], (err, results) => {
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

      loginUser: async (_, { email, password }) => {
        // Check if the user exists
        const user = await new Promise((resolve, reject) => {
          connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0]);
            }
          });
        });
  
        if (!user) {
          throw new Error('User not found');
        }
  
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
  
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', {
          expiresIn: '1h', // Adjust the expiration time as needed
        });
  
        return { token, user };
      },

      logoutUser: (_, __, { res }) => {
        // Clear the token on the client side
        res.clearCookie('token'); // Adjust based on your cookie implementation
  
        // Optionally, perform server-side actions such as session destruction or token revocation
  
        return true; // Indicate successful logout
      },
    },
  };
  
// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const token = req.headers.authorization || '';

    try {
      const decodedToken = jwt.verify(token, '0tKjrcs0NH');
      return { user: decodedToken, res };
    } catch (error) {
      return { res };
    }
  },
});


// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
