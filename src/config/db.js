const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');
const { dbUrl } = require('.');

const connect = async() => {
    const connection = await mongoose.connect(dbUrl, {dbName: 'VoidSotre'});
    console.log("Se ha conectado correctamente: ", connection.connection.host);
}

module.exports = connect