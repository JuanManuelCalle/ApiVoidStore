const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    password: String
})

userSchema.methods.hashPassword = function(password) {
    this.password = bcrypt.hashSync(password, 10000)
}

const User = mongoose.model('User', userSchema)

module.exports = User