const express = require('express')
const Task = require('../models/task')
const auth = require('../middlewares/auth')
const router = new express.Router()

//Create task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }    
})

//Get all tasks
router.get('/tasks', auth, async (req, res) => {

    try {
        // const tasks = await Task.find({owner:req.user._id})
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get a task by id
router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

//UPDATE TASK
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates!' });
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner:req.user._id})
        // const task = await Task.findById(_id);
       // const task = await Task.findByIdAndUpdate(_id, req.body, {new:true, runValidators: true});
        if(!task){
            return res.status(404).send()
        }
        updates.forEach(update => {task[update] = req.body[update]})
        await task.save()
        res.send(task)    
    } catch (e) {
        res.status(400).send(e)
    }
})

//DELETE A RESOURCE
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner:req.user._id});
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router