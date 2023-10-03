const jwt = require('jsonwebtoken');
const { jwtkey } = require('../config');
const bcrypt = require('bcrypt');
const Vendedor = require('../Models/Vendedor');

const Registro = async (req, res) => {
    try {
        const vendedor = new Vendedor(req.body);
        vendedor.hashPassword(req.body.password);
        const vendedorCreated = await vendedor.save();
        const vendedorJson = vendedorCreated.toJSON();
        delete vendedorJson.password

        return res.json({
            success: true,
            message: `El Vendedor ${req.body.email} se ha creado correctamente`,
            data: vendedorJson
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

    const vendedorLogin = await Vendedor.findOne({email})
    if(email === vendedorLogin.email && bcrypt.compareSync(password, vendedorLogin.password)){
        const vendedorJson = vendedorLogin.toJSON();
        delete vendedorJson.password

        const tokenCreated = jwt.sign(vendedorJson, jwtkey, {expiresIn: '2h'});
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