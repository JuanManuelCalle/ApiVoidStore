const { paypalClientId, paypalClientSecret } = require("../config");
const qs = require('qs');


const axios = require('axios').default

const createOrder = async (req, res) => {
    const {total} = req.body
    try{
        const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', qs.stringify({
            'grant_type': 'client_credentials'
        }), {
            headers: {
                "content-type": 'x-www-form-urlencoded',
                "Accept": 'application/json'
            },
            auth: {
                username: paypalClientId,
                password: paypalClientSecret
            }
        })

        const token = response.data.access_token

        console.log(token);

        const responsePaymentOrder = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": total
                    }
                }
            ],
        },{
            headers: {
                'Authorization': 'Bearer ' +token
            }
        })

        return res.json({
            success: true,
            orderID: responsePaymentOrder.data.id
        })
    }catch(error){
        console.log(error.response?.data);
        console.log(error);
        return res.json({
            success: false
        })
    }
}

module.exports = {
    createOrder
}