//CRUD OPERATIONS

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://localhost:27017';
const database = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
       return console.log('Unable to connect to database');
    }
    const db = client.db(database); //setting database

    //========================DELETE==========================
        // db.collection('users').deleteMany({
        //     age:27
        // }).then((result) => {
        //     console.log(result);
            
        // }).catch((error) => {
        //     console.log(result);
            
        // })
        //DELETING A DOCUMENT FROM THE COLLECTION
        db.collection('tasks').deleteOne({description: "Terminar de estudar"})
            .then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            })
    //========================DELETE==========================
    
    
    //========================UPDATE==========================
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5d811703b7e0b559bb79ab80")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then(({modifiedCount}) => {
    //     console.log(modifiedCount);
    // })
    // .catch((error) => {
    //     console.log(error);
    // })
    
    // updatePromise.then(({modifiedCount}) => {
    //     console.log(modifiedCount);
    // })
    // .catch((error) => {
    //     console.log(error);
        
    // })

    // db.collection('tasks').updateMany({
    //     completed:false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     if (result.modifiedCount) {
    //         console.log('Success ' + result.modifiedCount + ' updates');
    //     }else{
    //         console.log('Todos já estão true');
            
    //     }
    // })
    // .catch((error) => {
    //     console.log('error ' + error);
    // })
    //========================UPDATE==========================




    //========================FIND==========================
    // db.collection('users').findOne({_id: new ObjectID('5d811c9e841ca95cb3e1ff84')}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch'); 
    //     }

    //     console.log(user);
    // })

    // db.collection('users').find({age:27}).toArray((error, users) => { //return the all users from the db
    //     console.log(users);   
    // })

    // db.collection('users').find({age:27}).count((error, count) => { // return the quantity
    //     console.log(count);   
    // })

    // db.collection('tasks').findOne({_id: new ObjectID('5d8118028d318d5a3acbdc35')}, (error, task) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Incompleted');
    //     console.log(task);
    // });
    // db.collection('tasks').find({completed:true}).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Completed');
    //     console.log(tasks);
    // });
    //========================FIND==========================
});