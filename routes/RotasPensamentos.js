const express = require('express')
const router = express.Router()

// Controller
const pensamentos_controller = require('../controller/ControllerPensamentos')
const PensamentosController = new pensamentos_controller()


router.get('/', PensamentosController.GetPensamentos)

module.exports = router