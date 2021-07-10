const jwt = require('jsonwebtoken')
const tokenTable = require('../models/blacklistedtoken')
module.exports = async (req, res, next) => {
	try {
		const {
			authorization
		} = req.headers
		if (authorization) {
			const token = authorization.replace("Bearer ", "")
			const _token = await tokenTable.findOne({
				token: token
			})
			if (!_token) {
				//console.log(token)
				jwt.verify(token, "private-key", (err, decoded) => {
					if (err) {
						throw err
					} else {
						const {
							_id,
							email
						} = decoded
						req._id = _id
						req.email = email
						next()
					}
				})

			} else {
				const err = new Error("")
				err.status = 111
				throw err
			}
		} else {
			const err = new Error("")
			err.status = 111
			throw err
		}
	} catch (error) {
		next(error)
	}
}