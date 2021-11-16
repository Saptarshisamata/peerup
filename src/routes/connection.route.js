const express = require('express')

const jwt_auth = require('../middlewares/jwt_auth')
const connectionController = require('../controllers/connection.controller')
const router = express.Router()


// use jwt_auth in production 
router.get('/suggested_people',connectionController.suggestedPeoples)
router.post('/send_req',jwt_auth,connectionController.sendRequest)
router.get('/request_received_list',connectionController.connectionRequestReceivedList)
module.exports = router