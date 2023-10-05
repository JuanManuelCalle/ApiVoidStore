const { Router } = require('express');
const { createProducto, getProductos, updateProducto, deleteProducto, getProductosStore, getOneProducto } = require('../Controllers/producto');
const {auth} = require('../middleware/Auth');

function producto(app) {
    const router = Router();
    app.use('/api/producto/', router);

    // Controlador de errores para manejar la falta de autenticación
    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({
                success: false,
                message: 'Token de autenticación no válido o no recibido'
            });
        }
        next(err);
    });

    router.get('/get/:id', auth, getProductos);
    
    router.get('/getAll', auth, getProductosStore)

    router.get('/getOne/:id', auth, getOneProducto)

    router.post('/create', auth, createProducto);

    router.put('/update/:id', auth, updateProducto);

    router.delete('/delete/:id', auth, deleteProducto);
}

module.exports = producto;
