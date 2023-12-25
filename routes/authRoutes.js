const express = require('express')
const routasAutenticacao = express.Router()

// Controller Auth
const auth_controller = require('../controller/AuthController')
const AuthController = new auth_controller()

// Rotas
routasAutenticacao.get('/login', AuthController.login)
routasAutenticacao.post('/login', AuthController.loginPost)
routasAutenticacao.get('/registrar', AuthController.registrar)
routasAutenticacao.post('/registrar', AuthController.registrarUsuario)
routasAutenticacao.get('/logout', AuthController.logout)

module.exports = routasAutenticacao