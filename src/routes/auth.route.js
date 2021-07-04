const express = require('express')

const authRouter = express.Router()

const authController = require('../controllers/auth.controller')
const authValidator = require('../validations/auth.validation')

authRouter.post('/login',authValidator.loginValidationRules(),authValidator.validate,authController.login)
authRouter.post('/signup',authValidator.signupValidationRules(),authValidator.validate,authController.signup)
authRouter.post('/logged_in',authValidator.loggedInValidationRules(),authValidator.validate,authController.loggedIn)


module.exports = authRouter
