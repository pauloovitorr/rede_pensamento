const {DataTypes} = require('sequelize')
const conexao = require('../db/conn')

const User = conexao.define('User', {
    nome:{
        type: DataTypes.STRING,
        require: true,
    },
    email:{
        type: DataTypes.STRING,
        require: true,
    },
    senha:{
        type: DataTypes.STRING,
        require: true,
    },
})

module.exports = User