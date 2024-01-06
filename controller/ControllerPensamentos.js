const f = require('session-file-store')
const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

const {Op, or} = require('sequelize')


class PensamentosController {
    async GetPensamentos(req, res) {

        let pesquisar = ''

        if(req.query.pesquisar){
            pesquisar = req.query.pesquisar
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        }
        else{
            order = 'DESC'
        }

        const Pensamentos = await Pensamento.findAll({
            include:User,
            where: {
                titulo: {[Op.like]: `%${pesquisar}%` }
            },
            order: [['createdAt', order]]
        })

        const PensamentosDate = Pensamentos.map((result) => result.get({plain:true}))

      
        
        let pensamentos_qtd = PensamentosDate.length

        if(pensamentos_qtd === 0){
            pensamentos_qtd = false
        }

        res.render('pensamentos/home', {PensamentosDate, pesquisar, pensamentos_qtd})

    }

    async dashboard(req, res) {
        const userid = req.session.userid

        const user = await User.findOne({
            where:{id:userid},
            include: Pensamento,
            plain: true,
        })

        // Checa se usuário existe
        if(!user){
            res.redirect('/login')
        }

        const Pensamentos = user.Pensamentos.map((result)=> result.dataValues)

        let contem_Pensa = true

        if(Pensamentos.length === 0 ){
            contem_Pensa = false
        }
        
        res.render('pensamentos/dashboard', {Pensamentos, contem_Pensa})
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

   async rotaEditar(req,res){
        const {id} = req.body
        const user = await Pensamento.findOne({where: {id:id}, raw:true})

        res.render('pensamentos/editar', {user})
    }

    async editarPensamento(req,res){
        const titulo = req.body.titulo
        const id = req.body.id

        await Pensamento.update({titulo:titulo}, {where:{id:id}})
        res.redirect('/pensamentos/dashboard')
    }

    async remove(req,res){
        const {id} = req.body

        await Pensamento.destroy({where:{id:id}})

        res.redirect('/pensamentos/dashboard')
    }
}

module.exports = PensamentosController