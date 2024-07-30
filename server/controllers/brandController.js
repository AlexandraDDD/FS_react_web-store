const { Brand } = require("../models/models");

class BrandController{
    async create( req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getAll(req, res){
        const brands = await Brand.findAll();
        return res.json(brands);
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const type = await Brand.findOne({ where: { id } });

        if (!type) {
            return next(badRequest('отсутствует бренд'))
        }

        await type.destroy();
        return res.json({ message: 'Бренд успешно удален' });
    }
    
}
module.exports = new BrandController()