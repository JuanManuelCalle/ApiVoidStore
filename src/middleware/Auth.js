const {expressjwt: expressJWT} = require('express-jwt')
const {jwtkey} = require('../config');

const getToken = (req, res) => {
    const {authorization} = req.headers

    if(authorization){
        const [type, token] = authorization.split(' ')
        return type === 'Bearer' || type === 'Token' ? token : null
    }

    return null;
}

const auth = expressJWT({
    secret: jwtkey,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken,
});

const verifyRole = (rolesAllowed) => {
    return (req, res, next)=>{
        if (rolesAllowed.includes(req.auth.role)) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "No tienes permisos para acceder"
        })
    }
}

const handleAuthError = (error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
        res.status(401).json({
            success: false,
            message: "EL token de autorizacion no fue proveido o expiro"
        });
    }else{
        next(error);
    }
}

module.exports = {auth, handleAuthError, verifyRole}