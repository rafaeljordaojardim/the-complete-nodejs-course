const express = require('express');

require('./db/mongoose'); // loading mongoose to connect to the database
//importing models
const User = require('./models/user')
const Task = require('./models/task')
//importing routes
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
//creating a app
const app = express()
//setting the port
const port = process.env.PORT || 3000
//allowing receive json
app.use(express.json())
//using the rotes
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})