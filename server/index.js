const express = require('express')
const sequelize = require('./db')
require('dotenv').config()
const models = require('./models/models')
const cors = require('cors')
const router =  require('./routes/index')
const path = require('path')
const errorHandler = require('./middleware/ErrorHandlerMiddleWare')
const fileUpload = require('express-fileupload')


const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// обработка ошибки
app.use(errorHandler)

app.get('/', (req, res) =>{
    res.status(200).json({message:' Working!'})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
    }
    catch (e) {
        console.log(e);
    }
}
start()

