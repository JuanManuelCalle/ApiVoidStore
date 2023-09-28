const jwt = require('jsonwebtoken');
const { jwtkey } = require('../config');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const Registro = async (req, res) => {
    try {
        const user = new User(req.body);
        user.hashPassword(req.body.password);
        const userCreated = await user.save();

        return res.json({
            success: true,
            message: `El usuario ${req.body.email} se ha creado correctamente`,
            data: userCreated
        })
    }catch(error){
        return res.json({
            success: false,
            message: `El usuario no se pudo crear ${error.message}`
        })
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
    if(email === userLogin.email && bcrypt.compareSync(password, userLogin.password)){
        const userJson = userLogin.toJSON();
        delete userJson.password

        const tokenCreated = jwt.sign(userJson, jwtkey, {expiresIn: '2h'});
        return res.status(200).json({
            success: true,
            message: 'EL usuario es correcto, Logueando...',
            tokenCreated
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