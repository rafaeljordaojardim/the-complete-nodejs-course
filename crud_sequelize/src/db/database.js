const Sequelize = require('sequelize')

const sequelize = new Sequelize('crud_sequelize', 'rjj', '12345678', {
    host:'localhost',
    dialect:'postgres'
})

module.exports = sequelize