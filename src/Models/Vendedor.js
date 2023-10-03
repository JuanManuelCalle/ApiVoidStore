const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const vendedorSchema = new mongoose.Schema({
    nameTienda: String,
    name: String,
    lastName: String,
    email: String,
    password: String
})

vendedorSchema.methods.hashPassword = function(password) {
    this.password = bcrypt.hashSync(password, 10000)
}

const Vendedor = mongoose.model('Vendedor', vendedorSchema)

module.exports = Vendedor