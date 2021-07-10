const express = require('express')

const authRouter = require('./auth.route')
const connectionRouter = require('./connection.route')
const userRouter = require('./user.route')

const router = express.Router()



router.use('/auth',authRouter)
router.use('/connection',connectionRouter)
router.use('/user',userRouter)

module.exports = router