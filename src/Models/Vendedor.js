const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const vendedorSchema = new mongoose.Schema({
    nameTienda: {
        type: String,
        required: [true, 'El nombre de la tienda es required']
    },
    name: {
        type: String,
        required: [true, 'El nombre es required']
    },
    lastName: {
        type: String,
        required: [true, 'El lastname es required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es required']
    },
    password: {
        type: String,
        required: [true, 'La password es required']
    },
})

vendedorSchema.methods.hashPassword = function(password) {
    this.password = bcrypt.hashSync(password, 10000)
}

const Vendedor = mongoose.model('Vendedor', vendedorSchema)

module.exports = Vendedor