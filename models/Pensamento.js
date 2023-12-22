const {DataTypes} = require('sequelize')
const conexao = require('../db/conn')

const User = require('./User')

const Pensamento = conexao.define('Pensamentos',{
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

Pensamento.belongsTo(User)
User.hasMany(Pensamento)

module.exports = Pensamento