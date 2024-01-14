const {Sequelize} = require('sequelize')

const conexao = new Sequelize('railway','root','cdfFD3fhfdbeFGDG3Ab5dEe31Fe6cEaf',{
    host: 'viaduct.proxy.rlwy.net',
    dialect: 'mysql',
    port: 36550
})



module.exports = conexao