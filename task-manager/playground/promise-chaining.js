require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate('5d8367c6b3c4a71e1b1e988f', {age:20})
//     .then((user) => {
//         console.log(user);

//         return User.countDocuments({age:20})
//     }).then((count) =>{
//         console.log(count)
//     }).catch((e) => {
//         console.log(e); 
//     })

const updateAgeCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({age})
    return count
}


updateAgeCount('5d8367c6b3c4a71e1b1e988f', 30)
    .then((count) => {
        console.log(count); 
    })