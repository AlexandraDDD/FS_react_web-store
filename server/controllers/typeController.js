const { Type } =  require('../models/models');
const { badRequest } = require ('../error/ApiError');

class TypeController{
    async create( req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res){
        const types = await Type.findAll();
        return res.json(types);
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const type = await Type.findOne({ where: { id } });

        if (!type) {
            return next(badRequest('отсутствует тип'))
        }

        await type.destroy();
        return res.json({ message: 'Тип успешно удален' });
    }
    
}
module.exports = new TypeController()