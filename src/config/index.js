require('dotenv').config();

const config = {
    port: process.env.PORT,
    jwtkey: process.env.JWT_KEY,
    dbUrl: process.env.DB_URL,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
    email: process.env.EMAIL,
    passowrd: process.env.PASSWORD
}

module.exports = config