const { Router } = require('express');
const { createProducto, getProductos, updateProducto, deleteProducto, getProductosStore, getOneProducto, updateStok } = require('../Controllers/producto');
const {auth, verifyRole} = require('../middleware/Auth');

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

    router.get('/get/:id', auth, verifyRole(['VENDEDOR']) ,getProductos);
    
    router.get('/getAll', auth, getProductosStore)

    router.get('/getOne/:id', auth,getOneProducto)

    router.post('/create', auth, verifyRole(['VENDEDOR']) ,createProducto);

    router.put('/update/:id', auth, verifyRole(['VENDEDOR']) ,updateProducto);

    router.delete('/delete/:id', auth, verifyRole(['VENDEDOR']) ,deleteProducto);

    router.post('/updatestock', auth, updateStok)
}

module.exports = producto;
