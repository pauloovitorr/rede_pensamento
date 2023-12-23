const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

class PensamentosController{
    async GetPensamentos(req,res){
        res.render('pensamentos/home')
    }
}

module.exports = PensamentosController