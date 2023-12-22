const {Sequelize} = require('sequelize')

const conexao = new Sequelize('projeto_pensamentos','root','',{
    host: 'localhost',
    dialect: 'mysql'
})



module.exports = conexao