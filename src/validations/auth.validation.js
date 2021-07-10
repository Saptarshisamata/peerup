const {
	body,
	validationResult
} = require('express-validator')

const loginValidationRules = () => {

	return [
		body('email').isEmail().notEmpty(),
		body('password').notEmpty().isLength({
			min: 8
		})
	]

}

const signupValidationRules = () => {
	return [
		body('email').isEmail().notEmpty(),
		body('password').notEmpty().isLength({
			min: 8
		}),
		body('username').notEmpty(),
		body('exp').notEmpty().isNumeric()
	]

}

const loggedInValidationRules = () => {
	return [
		body('token')
	]
}
const validate = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			next()
		} else {
			console.log(errors)
			// errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
			errors.status = 422
			errors.message = "Invalid Parameter"
			throw errors
		}
	} catch (error) {
		next(error)
	}

}

module.exports = {
	loginValidationRules,
	signupValidationRules,
	loggedInValidationRules,
	validate
}