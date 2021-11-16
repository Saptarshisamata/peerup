const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const studentTable = require('../models/student')
// login controller 
const login = async (req, res, next) => {
	try {
		const email = req.body.email
		const student = await studentTable.findOne({
			email: email
		},{
			_id :1,
			password:1,
			username: 1,
			connection: 1
		})
		//console.log(student)
		if (student) {
			const password = req.body.password
			if (await bcrypt.compare(password, student.password)) {
				const payload = {
					_id: student._id,
					email: email
				}
				jwt.sign(payload, "private-key", {
					expiresIn: '24h'
				}, (err, token) => {
					if (err) {
						throw err
					} else {
						return res.status(200).json({
							"status": 200,
							"username":student.username,
							"token": token,
							"connection": student.connection,
							"message": "success"
						})
					}
				})

			} else {
				const err = new Error("invalid password")
				err.status = 401
				throw err
			}
		} else {
			const err = new Error("user not found")
			err.status = 404
			throw err
		}
	} catch (error) {
		next(error)
	}
}


//signup controller
const signup = async (req, res, next) => {
	try {
		if (!await studentTable.findOne({
				email: req.body.email
			})) {
			const salt = await bcrypt.genSalt()
			const hashed_password = await bcrypt.hash(req.body.password, salt)
			const new_student = new studentTable({
				email: req.body.email,
				username: req.body.username,
				password: hashed_password,
				goal: req.body.goal,
				exp: req.body.exp
			})
			await new_student.save()
			return res.status(201).json({
				status: 201,
				message: "success"
			})
		} else {
			return res.status(400).json({
				status: 400,
				message: "user_already_exist"
			})
		}
	} catch (error) {
		next(error)
	}
}

const loggedIn = async (req, res, next) => {
	try {

	} catch (error) {
		next(error)
	}
}

const logout = async (req, res, next) => {
	try {

	} catch (error) {
		next(error)
	}
}

module.exports = {
	login,
	signup,
	loggedIn
}