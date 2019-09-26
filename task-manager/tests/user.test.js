const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

// afterEach(() => {
//     console.log('afterEach');
    
// })

test('Should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name:'Rafael j',
        email:'jardin@jordao.com',
        password:'123456789'
    }).expect(201)
    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assertions abput the response
    expect(response.body).toMatchObject({
        user: {
            name:'Rafael j',
            email:'jardin@jordao.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('123456789')
})

test('Should login existing user', async () => {
   const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'sadasdsdasdsa',
    }).expect(400)
})

test('Shuld get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
        const user = await User.findById(userOneId)
        expect(user).toBeNull()
})

test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'rafael'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('rafael')
})

test('Should not update invalid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location:'Brazil'
        })
        .expect(400)
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})
   