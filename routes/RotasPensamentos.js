const express = require('express')
const router = express.Router()

// helpers
const checar = require('../helpers/auth')
const ChecarAutenticacao = new checar()

// Controller
const pensamentos_controller = require('../controller/ControllerPensamentos')
const PensamentosController = new pensamentos_controller()

router.get('/', PensamentosController.GetPensamentos)
router.get('/dashboard', ChecarAutenticacao.checar , PensamentosController.dashboard)
router.get('/add', ChecarAutenticacao.checar, PensamentosController.criarPensamento)
router.post('/editar', ChecarAutenticacao.checar, PensamentosController.rotaEditar)
router.post('/editando', ChecarAutenticacao.checar, PensamentosController.editarPensamento)
router.post('/add', ChecarAutenticacao.checar, PensamentosController.InserirPensamento)
router.post('/remove', ChecarAutenticacao.checar, PensamentosController.remove)


module.exports = router