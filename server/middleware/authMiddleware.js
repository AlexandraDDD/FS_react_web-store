const jwt = require('jsonwebtoken')
const { Basket } = require('../models/models')

module.exports = function ( req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return  res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        
        const basket =  Basket.findOne({ where: { userId: decoded.id } });
        req.user.basket = basket ? basket.id : null;
        next();
    

    }catch(e){
        res.status(401).json({message: "Ошибка при проверке авторизации"})
    }
}