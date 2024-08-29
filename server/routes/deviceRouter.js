const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), deviceController.create)
router.delete('/:id',checkRole('ADMIN'), deviceController.deleteDevice)
router.get('/all', deviceController.getAll)
router.get('/one/:id', deviceController.getOne)
router.get('/ids', deviceController.getByIds);
router.put('/update/:id', deviceController.update);

module.exports = router