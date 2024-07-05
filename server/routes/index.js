const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter')


router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router