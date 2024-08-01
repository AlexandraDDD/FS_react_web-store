const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { title } = require('process')

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", 'static', fileName))


            const device = await Device.create({ name, price, brandId, typeId, info, img: fileName })
            if (info) {
                info = JSON.parse(info)
                info.forEach(element =>
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id

                    })
                );
            }
            return res.json(device)

        }
        catch (err) {
            console.log("error device");
            next(ApiError.badRequest(err.message))
        }

    }
    async deleteDevice(req, res, next) {
        try {
            let { id } = req.params

            const device = await Device.findOne({ where: { id } })
            if (!device) {
                return res.status(404).json({ message: 'Device not found' })

            }
            await device.destroy()
            return res.json({ message: 'Device was deleted successfully' })

        }
        catch (err) {
            console.log("error delete device");
            next(ApiError.badRequest(err.message))
        }

    }
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
       
        brandId = Number(brandId)
        typeId = Number(typeId)
        // Проверяем, что brandId и typeId являются числами
        if (brandId && isNaN(brandId)) {
            return res.status(400).json({ message: 'Invalid brandId' });
        }
        if (typeId && isNaN(typeId)) {
            return res.status(400).json({ message: 'Invalid typeId' });
        }
        console.log(brandId, typeId, limit, page);
        page = page || 1
        limit = limit || 4
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }

        return res.json(devices)
    }
    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        })
        return res.json(device)
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            let { name, price, brandId, typeId, info } = req.body;
            const device = await Device.findOne({ where: { id } });
            if (req.files && req.files.img) {
                const { img } = req.files;
                if (img) {
                    let fileName = uuid.v4() + ".jpg";
                    img.mv(path.resolve(__dirname, "..", 'static', fileName));
                    device.img = fileName;
                }
            }
            if (!device) {
                return res.status(404).json({ message: 'Device not found' });
            }
            device.name = name;
            device.price = price;
            device.brandId = brandId;
            device.typeId = typeId;
            await device.save();

            if (info) {
                info = JSON.parse(info);
                await DeviceInfo.destroy({ where: { deviceId: device.id } });
                info.forEach(element =>
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id
                    })
                );
            }

            return res.json(device);
        } catch (err) {
            console.log("error update device");
            next(ApiError.badRequest(err.message));
        }
    }

}
module.exports = new DeviceController()