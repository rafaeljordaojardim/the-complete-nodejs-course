const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            } 
        }
    },
    password: {
        type:String,
        trim:true,
        required:true,
        minlength:7,
        validate(password){
            if(password.trim().toLowerCase().includes("password")){
                throw new Error('The password can\'t contain \'password\' ');
            }
        }

    },
    age: {
        type:Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//its acessable on the instances
userSchema.methods.generateAuthToken = async function () {
    const user = this//this is the user in this moment
    const token = jwt.sign({_id: user._id}, 'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}



//statics because its statics
//accessable on the models
// userSchema.statics.validateUnique = async (email) => {
//     const user = await User.findOne({email})
//     if(user){
//         throw new Error('Email is alredy in use')
//     }
//     return user
// }

//Adding a method to find the user with your credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    
    if(!user){
        throw new Error('Unable to login')
    }//if

    const isMatch = await bcrypt.compare(password, user.password)
    

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}



//hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this 
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

//exporting to other modules access it
module.exports = User