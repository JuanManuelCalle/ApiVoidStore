const { Router } = require('express');
const { Registro, InicioSesion } = require('../Controllers/Auth');

const auth = (app) => {
    const router = Router();

    app.use('/api/auth', router);

    router.post('/registro', Registro);
    router.post('/inicioSesion', InicioSesion)
}

module.exports = auth