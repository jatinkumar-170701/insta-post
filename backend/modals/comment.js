const sequelize = require('../utils/database');
const Sequelize = require('sequelize')

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    comment: {
        type: Sequelize.STRING,

    },
    to: {
        type: Sequelize.INTEGER
    }
}
)
module.exports = Comment;