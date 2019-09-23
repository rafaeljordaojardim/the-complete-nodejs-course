const express = require('express');

require('./db/mongoose'); // loading mongoose to connect to the database
//importing models
// const User = require('./models/user')
// const Task = require('./models/task')
//importing routes
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
//creating a app
const app = express()
//setting the port
const port = process.env.PORT || 3000
//
// app.use((req, res, next) => {
//    if(req.method === 'GET'){
//         res.send('GET methods are disabled')
//    }else{
//        next()
//    }
// })

// app.use((req,  res, next) => {
//     res.status(503).send('Site is currently down. check back soon');

// })


//allowing receive json
app.use(express.json())
//using the rotes
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
//     // const task = await Task.findById('5d88ebf29568f3381661a45f');
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner);
//     const user = await User.findById('5d88da5caacbe833e49f525b');
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
    
// }

// main()
