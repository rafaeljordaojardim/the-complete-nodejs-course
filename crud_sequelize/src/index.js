const express = require('express')
const app = express()
const userRoutes = require('./routes/user')
const port = 3001
app.use(express.json())
app.use(userRoutes)


app.listen(port, () => {
    console.log(`Running on port ${port}`);
})