const { Router } = require('express');
const { Registro, InicioSesion, recover } = require('../Controllers/Auth');
const {auth: authMiddleware} = require('../middleware/auth');

const auth = (app) => {
    const router = Router();

    app.use('/api/auth', router);

    router.post('/registro', Registro);
    router.post('/inicioSesion', InicioSesion)
    router.get('/recover', authMiddleware, recover)
}

module.exports = auth