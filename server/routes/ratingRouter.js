const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const ratingController = require('../controllers/ratingController')

router.post('/', checkRole(['ADMIN', 'USER']), ratingController.createRating)
/* router.get('/one/:deviceId', ratingController.getRating)
router.get('/ids', ratingController.getRatingsByDeviceIds) */
router.delete('/:id', checkRole('ADMIN'), ratingController.deleteRating);

module.exports = router