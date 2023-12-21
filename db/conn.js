const {Sequelize} = require('sequelize')

const conexao = new Sequelize('projeto_pensamentos','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    conexao.authenticate()
    console.log('Conectado ao banco de dados')
}
catch(erro){
    console.log('Erro ao banco de dados', erro)
}


module.exports = conexao