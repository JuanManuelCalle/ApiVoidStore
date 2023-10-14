const express = require('express');
const {port} = require('./config/index');
const connect = require('./config/db');
const producto = require('./Routes/productos');
const auth = require('./Routes/Auth');
const { handleAuthError } = require('./middleware/Auth');
const cors = require('cors');
const payments = require('./Routes/payments');
const orden = require('./Routes/Ordens');

const app = express();

app.use(express.json())

connect();

app.use(cors({
    origin: ['http://localhost:3000', 'https://voidstore.voidagencia.co/']
}))

auth(app);
producto(app);
payments(app)
orden(app)


app.use(handleAuthError)
app.listen(port, () => {
    console.log("Escuchando en: http://localhost:"+port);
})