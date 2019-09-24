const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/auth')//middleware authentication
const sharp = require('sharp')
const multer = require('multer')
const { sendWelcomeEmail, sendCanceledEmail } = require('../emails/account')

const uploadAvatar = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            callback(new Error('The file must be a image (jpg, jpeg, png)'));
        }
        callback(undefined, true);
    }

})
const router = new express.Router()

//CREATE USER ROTE
router.post('/users', async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save()
            sendWelcomeEmail(user.email, user.name)
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

// to log out
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//to logout in all devices
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.send(500).send(e)
    }
})

//GET USERS
router.post('/users/me/avatar', [auth, uploadAvatar.single('avatar')], async (req, res) => {
    //the modified file
    const buffer = await sharp(req.file.buffer).resize({ width:250, height:250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/me', auth ,async (req, res) => {
    res.send(req.user)
 })
 

//TO UPDATE
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates!' });
    }
    try {
        updates.forEach(update => {
            req.user[update] = req.body[update]//getting the exacty same thing
        });
        await req.user.save()
    //    const user = await User.findByIdAndUpdate(_id, req.body, {new:true, runValidators: true})
    //     if(!user){
    //         return res.status(404).send()
    //     }
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//DELETE A USER
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCanceledEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//to serve the images
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')//setting a type
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router