const { S } = require('core-js/modules/_export')
const User = require('../models/User')

const bcrypt = require('bcryptjs')
const { where } = require('sequelize')


class AuthController{

    login(req,res){
        res.render('auth/login')
    }

    registrar(req,res){
        res.render('auth/registrar')
    }

    async registrarUsuario(req,res){

        const {nome, email, senha, confirmesenha} = req.body

        // VALIDAÇÕES
        if(senha != confirmesenha){
            req.flash('mensagem', 'As senhas não conferem, tente novamente !')
            res.render('auth/registrar')

            return
        }
        const chekUserExite = await User.findOne({where: {email:email}})

        if(chekUserExite){
            req.flash('mensagem', 'O email já está cadastrado!')
            res.render('auth/registrar')
            return
        }

        // CRIANDO SENHA
        const salt = bcrypt.genSaltSync(10)
        const HashedSenha = bcrypt.hashSync(senha, salt)

        const user = {
            nome: nome,
            email: email,
            senha: HashedSenha
        }

        try{
          const criandoUsuario =  await User.create(user)

            // INICIALIZANDO A SESSÃO 
            req.session.userid = criandoUsuario.id

            req.flash('mensagem', 'Cadastro realizado com sucesso !')

            req.session.save(()=>{
                res.redirect('/')
            })
  
        }
        catch(erro){
            console.log('Erro ao cadastrar: ',erro)
        }
    }

    logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }

    async loginPost(req,res){
        const {email, senha} = req.body

        // VERIFICA SE USUÁRIO EXISTE
        const user = await User.findOne({where: {email:email}})

        if(!user){
            req.flash('mensagem', 'Usuário não encontrado !')
            res.render('auth/login')
            return
        }

        // Comparando Senhas
        const ComparaSenha = bcrypt.compareSync(senha, user.senha)

        if(!ComparaSenha){
            req.flash('mensagem', 'Senha Inválida !')
            res.render('auth/login')
            return
        }

        req.session.userid = user.id

        req.flash('mensagem', 'Autenticação realizada com sucesso !')

        req.session.save(()=>{
            res.redirect('/')
        })

    }

}

module.exports = AuthController