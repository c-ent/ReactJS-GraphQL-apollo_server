const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('apolloserver', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
