const mongoose = require('mongoose');

const productsItemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    name: String,
    qty: Number,
})

const OrdensSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: [true, 'El total es required']
    },
    productos: {
        type: [productsItemsSchema],
        required: [true, 'El productos es required']
    },
    idUsuario: {
        type: String,
        required: [true, "El id Usuario es required"]
    }
})

const Ordens = mongoose.model('Ordens', OrdensSchema)

module.exports = Ordens