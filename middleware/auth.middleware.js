const jwt = require('jsonwebtoken')
const { secret } = require('../config');

module.exports = (request, response, next) => {
    if (request.method === 'OPTIONS') {
        return next();
    }
    try {
        console.log(request.headers.authorization)
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            return response.status(401).json({message: "You aren't auth.."})
        }
        console.log('token is', token)
        const decoded = jwt.verify(token, secret);

        request.user = decoded;
        next();
    } catch (error) {
        response.status(401).json({message: "You aren't auth.."})
    }
}