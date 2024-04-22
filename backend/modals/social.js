const sequelize = require('../utils/database');
const Sequelize = require('sequelize')

const Social = sequelize.define('social', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
)
module.exports = Social;