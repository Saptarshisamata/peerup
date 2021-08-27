const jwt = require('jsonwebtoken')
var ObjectID = require('mongodb').ObjectID;
const studentTable = require('../models/student')


const suggestedPeoples = async (req, res, next) => {
	try {
		const {
			_id,
			email
		} = req
		//	const _id = req.body._id // for testing 
		const student = await studentTable.findOne({
			_id: _id
		})
		 const a = student.request_send
		 //push senders _id to array to filter out the object
		 a.push(_id)
		console.log(student.request_send,_id)
		// console.log(typeof a)
		//use while loop until array is empty
		//run below func 
		const suggestedPeoples = await studentTable.find({
			//$and dose not work with _id ,I don't find why ?? if you can find this 
			// $and: [{
			// 	_id: {
			// 		$ne: _id
			// 	}
			// }, {
			// 	_id: {
			// 		$nin: student.request_send
			// 	}
			// }],
			// _id: {
			// 	$ne: _id
			// },
			_id: {
				$nin: a
			},
			// topics:{
			// 	$in:["array"]
			// },
			//match should be done with in same type
			// request_send:{
			// 	$nin:student.request_send
			// },
			goal: student.goal,
			$and: [{
				exp: {
					$gte: student.exp - 5
				}
			}, {
				exp: {
					$lte: student.exp + 5
				}
			}],
		})
		return res.status(200).json(suggestedPeoples)

	} catch (error) {
		next(error)
	}
}

const sendRequest = async (req, res, next) => {
	try {
		const {
			_id,
			email
		} = req
		// const student = await studentTable.findOne({
		// 	_id: _id
		// })
		const id = req.body.id
		await studentTable.updateOne({
			_id: _id
		}, {
			$addToSet: {
				request_send: id
			}
		})
		return res.status(200).json({

		})
	} catch (error) {
		next(error)
	}
}

const acceptRequest = async (req, res, next) => {
	try {

	} catch (error) {

	}
}

const deleteRequest = async (req, res, next) => {
	try {

	} catch (error) {

	}
}

const deleteConnection = async (req, res, next) => {
	try {
		
	} catch (error) {
		
	}
}


module.exports = {
	suggestedPeoples,
	sendRequest,
	acceptRequest,
	deleteRequest,
	deleteConnection
}

