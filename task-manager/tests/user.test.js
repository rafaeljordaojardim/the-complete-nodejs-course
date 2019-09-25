const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name:'Rafael j',
        email:'jardin@jordao.com',
        password:'123456'
    }).expect(201)
})
