const sequelize = require('../db/database')
const User = require('../models/user')


const createUser = async (req, res) => {
    const {name, age} = req.body
    try {
        const user = await User.create({
            name:name,
            age:age
        })
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
}//save

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    } 
}//getUsers

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).send()
        }
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}//getUser

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).send()
        }
        const {name, age} = req.body
        const result = await User.update({name, age}, { 
            where:{
                id:id
            }
        })        
        if (result[0] === 0) {
            return res.status(404).send('User not found')
        }
        res.send({result:result[0]})
    }catch(e){
        res.status(500).send()
    }
}//updateUser

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(400).send()
        }
        const result = await User.destroy({
            where: {
                id:id
            }
        })
        if(!result){
            return res.status(404).send('User not found')
        }
        res.send()
    } catch (e) {
        res.status(500).send()        
    }
}

module.exports = {createUser, getUsers, getUser, updateUser, deleteUser}