const { Basket, BasketDevice } = require('../models/models');
const ApiError = require('../error/ApiError');



class BasketController {
  async addDevice(req, res, next) {
    try {
      const { deviceId, count } = req.body;
      const { id } = req.user;

      const basket = await Basket.findOne({ where: { userId: id } });

      if (!basket) {
        const newBasket = await Basket.create({ userId: id });
        await BasketDevice.create({
          basketId: newBasket.id,
          deviceId,
          count,
        });
      } else {
        const existingBasketDevice = await BasketDevice.findOne({
          where: { basketId: basket.id, deviceId },
        });

        if (existingBasketDevice) {
          existingBasketDevice.count += count;
          await existingBasketDevice.save();
        } else {
          await BasketDevice.create({
            basketId: basket.id,
            deviceId,
            count,
          });
        }
      }

      return res.json({ message: "Товар успешно добавлен в корзину" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async removeDevice(req, res, next) {
    try {
      const { deviceId } = req.body;
      const { id } = req.user;

      const basket = await Basket.findOne({ where: { userId: id } });
      const basketDevice = await BasketDevice.findOne({
        where: { basketId: basket.id, deviceId },
      });

      if (!basketDevice) {
        return next(ApiError.badRequest("Товар не найден в корзине"));
      }

      await basketDevice.destroy();

      return res.json({ message: "Товар успешно удален из корзины" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async clearBasket(req, res, next) {
    try {
      const { id } = req.user;

      const basket = await Basket.findOne({ where: { userId: id } });
      await BasketDevice.destroy({ where: { basketId: basket.id } });

      return res.json({ message: "Корзина успешно очищена" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getBasket(req, res, next) {
    try {
      const { id } = req.user;
      const basket = await Basket.findOne({ where: { userId: id } });

      const basketDevices = await BasketDevice.findAll({
        where: { basketId: basket.id },
       
      });

      return res.json(basketDevices);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new BasketController();

