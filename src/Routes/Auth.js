const { Router } = require('express');
const { Registro, InicioSesion, recover, passwordRecovery, changePassowrd } = require('../Controllers/Auth');
const {auth: authMid} = require('../middleware/Auth')

const auth = (app) => {
    const router = Router();

    app.use('/api/auth', router);

    router.post('/registro', Registro);
    router.post('/inicioSesion', InicioSesion)
    router.get('/recover', authMid, recover)
    router.post('/recoverPassword', passwordRecovery)
    router.post('/change_passoword', changePassowrd)
}

module.exports = auth