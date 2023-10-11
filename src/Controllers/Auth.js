const jwt = require('jsonwebtoken');
const { jwtkey } = require('../config');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const Registro = async (req, res) => {
    try {
        const user = new User(req.body);
        const validationResult = user.validateSync();

        if(validationResult?.errors){
            return res.status(400).json({
                success: false,
                message: Object.keys(validationResult.errors).map((key)=>{return {property:key, message:validationResult.errors[key].message}}),
            });
        }

        user.hashPassword(req.body.password);
        const userSaved = (await user.save()).toJSON();
        delete userSaved.password

        return res.json({
            success: true,
            message: `El usuario ${req.body.email} se ha creado correctamente`,
            data: userSaved
        })
    }catch(error){
        console.log('Catch', error);
        if(error.code===11000){
            return res.json({
                success: false,
                message: `El usuario ya se encuentra registrado ${error.message}`
            })
        }else{
            return res.json({
                success: false,
                message: `El usuario no se pudo crear ${error.message}`
            })
        }
    }
}

const InicioSesion = async (req, res) => {

    const {email, password} = req.body
    
    if(!(email && password)){

        return res.status(400).json({
            success: false,
            message: "No se proporciono ninguna credencial"
        })
    }

    const userLogin = await User.findOne({email})
    if(userLogin === null){
        return res.json({
            success: false,
            message: "El usuario no fue encontrado intenta nuevamente",
        })
    }

    if(email === userLogin.email && bcrypt.compareSync(password, userLogin.password)){

        const userJson = userLogin.toJSON();

        delete userJson.password

        const tokenCreated = jwt.sign(userJson, jwtkey, {expiresIn: '2h'});
        return res.status(200).json({
            success: true,
            message: 'EL usuario es correcto, Logueando...',
            tokenCreated,
            data: userJson
        })
    }

    return res.status(400).json({
        success: false,
        message: "El usuario o contraseña no son correctas"
    })
}

const recover = (req, res) => {
    return res.json({
        success: true,
        data: req.auth
    })
}

module.exports = {
    Registro,
    InicioSesion,
    recover
}