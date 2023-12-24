
class AuthController{

    login(req,res){
        res.render('auth/login')
    }

    registrar(req,res){
        res.render('auth/registrar')
    }
}

module.exports = AuthController