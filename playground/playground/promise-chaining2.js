require('../src/db/mongoose')

const Task = require('../src/models/task')


// Task.findByIdAndDelete('5d82716f8287c96dca7aaeee')
//     .then((user) => {
//         if (!user) {
//             console.log('User not found');
//         }else{
//             console.log(user);
//         }
//         return Task.countDocuments({completed:false})
//     }).then((result) => {
//         if (result) {
//             console.log(result)
//         }else {
//             console.log(0);
//         }
//     }).catch((e) => console.log(e))

const deleteTask = async (id) => {
    const user = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed:false })
    return count
}

deleteTask('5d83890ae372f738f2e04266')
    .then((count) => console.log(count))
    .catch((error) => console.log(error))
    
