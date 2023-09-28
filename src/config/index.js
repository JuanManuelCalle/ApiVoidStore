require('dotenv').config();

const config = {
    port: process.env.PORT,
    jwtkey: process.env.JWT_KEY,
    dbUrl: process.env.DB_URL
}

module.exports = config