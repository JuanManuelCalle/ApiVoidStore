require('dotenv').config();

const config = {
    port: process.env.PORT,
    jwtkey: process.env.JWT_KEY
}

module.exports = config