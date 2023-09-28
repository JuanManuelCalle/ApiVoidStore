const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    name: String,
    precio: Number,
    descripcion: String,
    stok: Number
})

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;