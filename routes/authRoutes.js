const express = require('express')
const routasAutenticacao = express.Router()

// Controller Auth
const auth_controller = require('../controller/AuthController')
const AuthController = new auth_controller()

// Rotas
routasAutenticacao.get('/login', AuthController.login)
routasAutenticacao.get('/registrar', AuthController.registrar)

module.exports = routasAutenticacao