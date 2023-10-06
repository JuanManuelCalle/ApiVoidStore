const { Router } = require("express");
const { createOrder } = require("../Controllers/payments");

const payments = (app) => {
    const router = Router()
    app.use('/api/payments', router)
    router.post('/create', createOrder)
}

module.exports = payments