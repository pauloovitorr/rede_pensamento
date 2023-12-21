const express = require('express')
const app = express()
const handleabrs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const porta = 3003
const conexao = require('./db/conn')



conexao.sync()
.then(()=>{
    app.listen(porta, ()=>{
        console.log('Servidor no ar')
    })
})
.catch((err)=>{
    console.log('Servidor não está no ar')
})