const Sequelize = require('sequelize');

const sequelize = new Sequelize('social', 'root', 'Mysql@1707', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;