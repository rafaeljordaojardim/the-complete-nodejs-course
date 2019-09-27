const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'rjj', '12345678', {
    host:'localhost',
    dialect:'postgres'
})

//Usuario

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})
Postagem.create({
    titulo: "test",
    conteudo:"ashduahsdhsaudhasudhs"
})
// const Usuario = sequelize.define('usuarios', {
//     nome: {
//         type:Sequelize.STRING
//     },
//     sobrenome: {
//         type: Sequelize.STRING
//     },
//     idade: {
//         type: Sequelize.INTEGER
//     },
//     email: {
//         type:Sequelize.STRING
//     }
// })
// Usuario.sync({force:true})
// Postagem.sync({force:true})