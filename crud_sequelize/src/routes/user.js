const express = require('express')
const routes = new express.Router();
const userController = require('../controller/user')

routes.post('/users', userController.createUser)
routes.get('/users', userController.getUsers)
routes.get('/users/:id', userController.getUser)
routes.patch('/users/:id', userController.updateUser)
routes.delete('/users/:id', userController.deleteUser)

module.exports = routes