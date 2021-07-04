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

const signupValidationRules =  () => {
	return [
		body('email').isEmail().notEmpty(),
		body('password').notEmpty().isLength({
			min: 8
		}),
		body('username').notEmpty()
	]

}

const loggedInValidationRules =  () => {
	return[
		body('token')
	]
}
const validate = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			return next()
		}
		console.log(errors)
		// errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
		return res.status(422).json()
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