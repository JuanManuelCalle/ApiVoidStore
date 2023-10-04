const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es required']
    },
    precio: {
        type: String,
        required: [true, 'El precio es required']
    },
    descripcion: {
        type: String,
        required: [true, 'El descripcion es required']
    },
    stok: {
        type: Number,
        required: [true, 'La stok es required']
    },
    id_vendedor: {
        type: Number,
        required: [true, 'La stok es required']
    },
})

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;