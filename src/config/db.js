const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const connect = async() => {
    const connection = await mongoose.connect(`mongodb://127.0.0.1:27017/VoidStore`);
    console.log("Se ha conectado correctamente: ", connection.connection.host);
}

module.exports = connect