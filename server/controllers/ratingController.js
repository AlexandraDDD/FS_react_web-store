
const ApiError = require('../error/ApiError');
const { User, Device, Rating } = require('../models/models');

class RatingController {
    async createRating(req, res, next) {
        try {
            const { deviceId, rate } = req.body;
            const { id } = req.user;

            const user = await User.findOne({ where: { id } });
            const device = await Device.findOne({ where: { id: deviceId } });

            if (!user || !device) {
                return next(ApiError.badRequest('User or device not found'));
            }

            const existingRating = await Rating.findOne({ where: { userId: id, deviceId } });

            if (existingRating) {
                return res.status(409).json({ message: 'Rating already exists' });
              }
              

            const rating = await Rating.create({ userId: id, deviceId, rate });

            const ratings = await Rating.findAll({ where: { deviceId } });
            const sum = ratings.reduce((acc, rating) => acc + rating.rate, 0);
            const average = sum / ratings.length;
    
            device.rating = average;
            await device.save();

            return res.json(rating);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

   /*  async getRating(req, res, next) {
        try {
            const { deviceId } = req.params;

            const device = await Device.findOne({ where: { id: deviceId } });

            if (!device) {
                return next(ApiError.badRequest('Device not found'));
            }

            const ratings = await Rating.findAll({ where: { deviceId } });

            const sum = ratings.reduce((acc, rating) => acc + rating.rate, 0);
            const average = sum / ratings.length;

            return res.json({ average });
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    } */

    async deleteRating(req, res, next) {
        try {
            const { id } = req.params;
            const { id: userId } = req.user;
    
            const rating = await Rating.findOne({ where: { id, userId } });
    
            if (!rating) {
                return next(ApiError.badRequest('Rating not found'));
            }
    
            await rating.destroy();
    
            const device = await Device.findOne({ where: { id: rating.deviceId } });
            const ratings = await Rating.findAll({ where: { deviceId: rating.deviceId } });
    
            if (ratings.length === 0) {
                device.rating = 0;
            } else {
                const sum = ratings.reduce((acc, rating) => acc + rating.rate, 0);
                const average = sum / ratings.length;
                device.rating = average;
            }
    
            await device.save();
    
            return res.json({ message: 'Rating deleted' });
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }
    
   /*  async getRatingsByDeviceIds(req, res, next) {
        try {
            const { idArray } = req.query;

            const deviceIds = idArray.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
            console.log(deviceIds);

        
            const devices = await Device.findAll({ where: { id: deviceIds } });

            if (devices.length !== deviceIds.length) {
                return next(ApiError.badRequest('One or more devices not found'));
            }

            const ratings = await Rating.findAll({ where: { deviceId: deviceIds } });

            const ratingsByDeviceId = ratings.reduce((acc, rating) => {
                const { deviceId, rate } = rating;
                if (!acc[deviceId]) {
                    acc[deviceId] = { sum: rate, count: 1 };
                } else {
                    acc[deviceId].sum += rate;
                    acc[deviceId].count += 1;
                }
                return acc;
            }, {});

            const averages = Object.entries(ratingsByDeviceId).map(([deviceId, { sum, count }]) => {
                return { deviceId, averageRating: sum / count };
            });

            return res.json(averages);
        } catch (err) {
            next(ApiError.badRequest(err.message +"getIDS"));
        }
    } */

}


module.exports = new RatingController();
