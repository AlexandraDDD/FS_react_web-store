const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), deviceController.create)
router.delete('/:id',checkRole('ADMIN'), deviceController.deleteDevice)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put('/:id', deviceController.update);

module.exports = router