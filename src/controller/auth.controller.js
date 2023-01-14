const userSchema = require('../models/userSchema')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = class AuthController {

    static async login(req, res) {
        	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        if(req.method != 'POST'){
            return res.status(405).json({msg: 'Metodo invalido, Utilize o Metodo POST para utilizar!'})
        }

        const {email, password} = req.body

        if(!email){
            return res.status(422).json({msg: 'Email é obrigatorio'})
        }
        
        if(!password){
            return res.status(422).json({msg: 'Senha é obrigatorio'})
        }
    
        //Check if exist user
        const user = await userSchema.findOne({email: email})
    
        if(!user){
            return res.status(404).json({msg: 'Usuario não encontrado'})
        }
    
        //Check password
        const checkPassword = await bcrypt.compare(password, user.password)
    
        if(!checkPassword){
            return res.status(422).json({msg: 'Senha invalida'})
        }
    
        try{
            const secret = process.env.SECRET
    
            const token = jwt.sign(
                {
                    id: user._id
                },
                secret
            )
            res.status(200).json({msg: 'Autenticação realizada com sucesso!', token: token})
        } catch(err){
            console.log(err)
            return res.status(500).json({msg: 'Erro Interno do servidor, tente novamente mais tarde'})
        }
    }

    static async register(req, res) {
        	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        const {name, email, role, password, confirmpassword} = req.body
    
        //validations
        if(!name){
            return res.status(422).json({msg: 'Nome é obrigatorio'})
        }

        if(!role){
            return res.status(422).json({msg: 'Cargo é obrigatorio'})
        }
    
        if(!email){
            return res.status(422).json({msg: 'Email é obrigatorio'})
        }
        
        if(!password){
            return res.status(422).json({msg: 'Senha é obrigatorio'})
        }
    
        if(password !== confirmpassword){
            return res.status(422).json({msg: 'As senhas não conferem'})
        }
    
        //Check if exist user
        const userExists = await userSchema.findOne({email: email})
    
        if(userExists){
            return res.status(422).json({msg: 'Email já cadastrado! Utilize outro email'})
        }
    
        // Crate Password
        const salt = await bcrypt.genSalt(12)
        const passHash = await bcrypt.hash(password, salt)
    
        //Create User
        const user = new userSchema(
            {
                name,
                email,
                password:passHash
            }
        )
        try{
            await user.save()
            res.status(201).json({msg: 'Usuario Criado com sucesso!'})
        } catch(err) {
            console.log(err)
            return res.status(500).json({msg: 'Erro Interno do servidor, tente novamente mais tarde'})
        }

        return res.status(500).json({msg: 'Erro Interno do servidor, tente novamente mais tarde'})
    }
}