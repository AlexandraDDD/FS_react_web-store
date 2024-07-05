const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')
const generateJwt = (id, email, role, basket) => {
    return jwt.sign(
        { id, email, role, basket },
        process.env.JWT_KEY,
        { expiresIn: '24h' }
    );
};


class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({ where: { email: email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))

        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })

        await Basket.create({ userId: user.id })
        const userBasket = await Basket.findOne({ where: { userId: user.id } });
       
        const token = generateJwt(user.id, user.email, user.role, userBasket.id);
        return res.json({ token })
    }
    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email }, include: [{ model: Basket }] });
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден либо корзина не создана'))

        };
        
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Пароль неверный'))
        }
        if (!user.Basket) {
            // Создаем новую корзину для пользователя, если она отсутствует
            const newBasket = await Basket.create({ userId: user.id });
            user.Basket = newBasket;
          }

        const token = generateJwt(user.id, user.email, user.role, user.Basket.id);
        return res.json({ token })
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })

    }
}
module.exports = new UserController()