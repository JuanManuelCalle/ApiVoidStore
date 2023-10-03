const { Router } = require('express');
const { Registro, InicioSesion, recover } = require('../Controllers/AuthVendedor');
const {auth: authMid} = require('../middleware/Auth')

const authVendedor = (app) => {
    const router = Router();

    app.use('/api/auth/vendedor', router);

    router.post('/registro', Registro);
    router.post('/inicioSesion', InicioSesion)
    router.get('/recover', authMid, recover)
}

module.exports = authVendedor