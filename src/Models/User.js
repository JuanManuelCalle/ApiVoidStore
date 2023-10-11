const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
    passwordRecoveryCode: String,
    role: {
        type: String,
        enum: ['VENDEDOR', 'REGULAR'],
        default: 'REGULAR'
    }
})

userSchema.methods.hashPassword = function(password) {
    this.password = bcrypt.hashSync(password, 10000)
}

const User = mongoose.model('User', userSchema)

module.exports = User