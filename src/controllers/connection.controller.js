const jwt = require('jsonwebtoken')

const studentTable = require('../models/student')


const suggestedPeoples = async (req ,res,next) => {
	try {
		const { _id , email} = req
	//	const _id = req.body._id // for testing 
		const student  = await studentTable.findOne({_id : _id})

		const suggestedPeoples = await studentTable.find({
			_id:{
				$ne:_id
			},
			goal:student.goal,
			$and:[{exp:{$gte:student.exp-5}},{exp:{$lte:student.exp+5}}],
		})
		return res.status(200).json(suggestedPeoples)

	} catch (error) {
		next(error)
	}
}

const sendRequest = async (req,res,next) => {

}

const acceptRequest = async (req,res,next) => {

}

const deleteRequest = async (req,res,next) => {

}

const deleteConnection = async (req,res,next) => {

}


module.exports = {
	suggestedPeoples,
	sendRequest,
	acceptRequest,
	deleteRequest,
	deleteConnection
}