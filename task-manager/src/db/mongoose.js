const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex:true,
     useUnifiedTopology: true 
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
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
    }
})

// const me = new User({ 
//     name: '        Rafael                  ', 
//     email:'               RAFAEL@RAFAEL.COM ',
//     password:"1234567"
//     })
//     me.save()
//         .then(() => console.log('foi', me))
//         .catch((error) => console.log(error))

const Task = mongoose.model('Task', {
    description: {
        type:String,
        trim:true,
        required:true,
    },
    completed: {
        default:false,
        type:Boolean
    }
})

const myTask = new Task({
    description: 'Terminar curso node',
    
})

myTask.save().then(() => {
    console.log(myTask);
}).catch((error) => {
    console.log(error);
    
})