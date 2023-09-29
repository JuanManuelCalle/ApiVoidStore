const { Router } = require('express');
const { Registro, InicioSesion, recover } = require('../Controllers/Auth');
const {auth: authMid} = require('../middleware/Auth')

const auth = (app) => {
    const router = Router();

    app.use('/api/auth', router);

    router.post('/registro', Registro);
    router.post('/inicioSesion', InicioSesion)
    router.get('/recover', authMid, recover)
}

module.exports = auth