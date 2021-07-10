const express = require('express')

const jwt_auth = require('../middlewares/jwt_auth')
const connectionController = require('../controllers/connection.controller')
const router = express.Router()


// use jwt_auth in production 
router.get('/suggested_people',jwt_auth,connectionController.suggestedPeoples)

module.exports = router