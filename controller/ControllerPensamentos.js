const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

class PensamentosController {
    async GetPensamentos(req, res) {
        res.render('pensamentos/home')
    }

    async dashboard(req, res) {
        res.render('pensamentos/dashboard')
    }

    async criarPensamento(req, res) {
        res.render('pensamentos/create')
    }

    async InserirPensamento(req, res) {

        const Pensamentoo = {
            titulo: req.body.titulo,
            UserId: req.session.userid
        }

        try {
            await Pensamento.create(Pensamentoo)

            req.flash('mensagem', 'Pensamento criado com sucesso !')

            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        }
        catch (erro) {
            console.log('Erro: ', erro)
        }

    }
}

module.exports = PensamentosController