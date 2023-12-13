const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Import your Sequelize instance

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Foreign key referencing the User model
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Name of the referenced model (case-sensitive)
      key: 'id',      // Name of the referenced column in the User model
    },
  },
});

module.exports = Task;
