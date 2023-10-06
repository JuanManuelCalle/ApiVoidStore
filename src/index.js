const express = require('express');
const {port} = require('./config/index');
const connect = require('./config/db');
const producto = require('./Routes/productos');
const auth = require('./Routes/Auth');
const { handleAuthError } = require('./middleware/Auth');
const cors = require('cors');
const authVendedor = require('./Routes/AuthVendedor');
const payments = require('./Routes/payments');

const app = express();

app.use(express.json())

connect();

app.use(cors({
    origin: ['http://localhost:3000']
}))

auth(app);
authVendedor(app)
producto(app);
payments(app)


app.use(handleAuthError)
app.listen(port, () => {
    console.log("Escuchando en: http://localhost:"+port);
})