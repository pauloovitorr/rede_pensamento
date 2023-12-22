const express = require('express')
const app = express()
const handleabrs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const porta = 3003
const conexao = require('./db/conn')


// Models
const Pensamento = require('./models/Pensamento')
const User = require('./models/User')


// views dinâmicas
app.engine('handlebars', handleabrs.engine())
app.set('view engine', 'handlebars')


// public
app.use(express.static('public'))



// corpo requisição
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// session midddleware
app.use(
    session({
      name: "session",
      secret: "CuRs0Nod&",
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(), 'sessions')
      }),
      cookie:{
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
      }
}))

// flash messages
app.use(flash())

// set session to res
app.use((req,res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()

})


conexao.sync()
.then(()=>{
    app.listen(porta, ()=>{
        console.log('Servidor no ar')
    })
})
.catch((err)=>{
    console.log('Servidor não está no ar')
})