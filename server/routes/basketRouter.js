const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, basketController.addDevice);
router.post('/remove', authMiddleware, basketController.removeDevice);
router.post('/clear', authMiddleware, basketController.clearBasket);
router.get('/', authMiddleware, basketController.getBasket);

module.exports = router;
