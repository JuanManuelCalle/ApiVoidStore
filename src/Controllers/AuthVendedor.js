const jwt = require('jsonwebtoken');
const { jwtkey } = require('../config');
const bcrypt = require('bcrypt');
const Vendedor = require('../Models/Vendedor');

const Registro = async (req, res) => {
    try {
        const vendedor = new Vendedor(req.body);
        const validationResult = vendedor.validateSync();

        if(validationResult?.errors){
            return res.status(400).json({
                success: false,
                message: Object.keys(validationResult.errors).map((key)=>{return {property:key, message:validationResult.errors[key].message}}),
            });
        }

        vendedor.hashPassword(req.body.password);
        const vendedorSaved = (await vendedor.save()).toJSON();
        delete vendedorSaved.password
        return res.json({
            success:true,
            message: 'El usuario se registro correctamente',
            data: vendedorSaved
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

    const vendedorLogin = await Vendedor.findOne({email})

    if(email === vendedorLogin.email && bcrypt.compareSync(password, vendedorLogin.password)){

        const vendedorJson = vendedorLogin.toJSON();

        delete vendedorJson.password

        const tokenCreated = jwt.sign(vendedorJson, jwtkey, {expiresIn: '1d'});

        return res.status(200).json({
            success: true,
            message: 'EL usuario es correcto, Logueando',
            tokenCreated,
            data: vendedorJson
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