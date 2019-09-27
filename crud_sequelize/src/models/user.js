const Sequelize = require('sequelize')
const sequelize = require('../db/database')

const User = sequelize.define('user', { 
    name: {
        type:Sequelize.STRING
    },
   age: {
       type:Sequelize.INTEGER
   }
})

module.exports = User