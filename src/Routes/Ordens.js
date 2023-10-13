const { Router } = require('express');
const {auth, verifyRole} = require('../middleware/Auth');
const {createOrden, getOneProducto, deleteOrden} = require('../Controllers/Ordens');

function orden(app) {
    const router = Router();
    app.use('/api/orden/', router);

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({
                success: false,
                message: 'Token de autenticación no válido o no recibido'
            });
        }
        next(err);
    });

    /* router.get('/get/:id', auth, verifyRole(['VENDEDOR']) ,getProductos); */

    router.post('/create', auth, createOrden);

    router.get('/get/:id', auth, getOneProducto)

    router.delete('/deleteOrden/:id', auth, deleteOrden)
}

module.exports = orden;
