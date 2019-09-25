const express = require('express');

require('./db/mongoose'); // loading mongoose to connect to the database

//importing routes
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
//creating a app
const app = express()

//allowing receive json
app.use(express.json())
//using the rotes
app.use(userRouter)
app.use(taskRouter)

module.exports = app