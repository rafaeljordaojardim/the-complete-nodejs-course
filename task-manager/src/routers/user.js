const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')//middleware authentication
const router = new express.Router()

//CREATE USER ROTE
router.post('/users', async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({user, token})
        } catch (e) {
            res.status(400).send(e)
        }
   
    
});

router.post('/users/login', async (req, res) => {
    try {
        //we will create the funcition findByCredentials
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET USERS
router.get('/users/me', auth ,async (req, res) => {
    res.send(req.user)
 })
 
//GET A USER BY ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
       const user = await User.findById(_id)
       if (!user) {
           return res.status(404).send()
       }
       res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

//TO UPDATE
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates!' });
    }
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        updates.forEach(update => {
            user[update] = req.body[update]//getting the exacty same thing
        });
        await user.save()
       // const user = await User.findByIdAndUpdate(_id, req.body, {new:true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//DELETE A USER
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router