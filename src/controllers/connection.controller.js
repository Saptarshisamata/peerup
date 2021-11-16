const studentTable = require('../models/student')


const suggestedPeoples = async (req, res, next) => {
	try {
		const {
			id,
		} = req
		const student = await studentTable.findOne({
			_id: id
		})
		var a = (student.request_send).map(elem => elem)
		//push senders _id to array to filter out the object
		a.push(id)
		a.push(...student.request_receive)
		// console.log(student.request_send)
		// console.log(a)
		// console.log(typeof mongoose.Types.ObjectId(id))
		//use while loop until array is empty
		//run below func
		var suggestedPeoples = []
		var g_exp = student.exp
		var l_exp = student.exp
		while (suggestedPeoples.length === 0) {
			suggestedPeoples = await studentTable.find({
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
						$gte: g_exp
					}
				}, {
					exp: {
						$lte: l_exp
					}
				}],
			})
			g_exp = g_exp - 5
			l_exp = l_exp + 5
			console.log(suggestedPeoples.length)
		}
		
		return res.status(200).json(suggestedPeoples)

	} catch (error) {
		next(error)
	}
}

const sendRequest = async (req, res, next) => {
	try {
		const {
			id,
			req_send_id,
			email
		} = req
		// const student = await studentTable.findOne({
		// 	_id: _id
		// })
		await studentTable.updateOne({
			_id: id
		}, {
			$addToSet: {
				request_send: req_send_id
			}
		})
		await studentTable.updateOne({
			_id: req_send_id
		},{
			$addToSet: {
				request_receive: id
			}
		})
		return res.status(200).json({
			status:"ok"
		})
	} catch (error) {
		next(error)
	}
}
const connectionRequestReceivedList = async (req, res, next) => {
	try {
		const {
			id
		} = req
		const list = await studentTable.findOne({_id:id}).populate('request_receive')
		return res.status(200).json(list.request_receive)

	} catch (error) {
		next(error)
	}
}

const connectionRequestSendList = async (req, res, next) => {
	try {
		const {
			id
		} = req
		const list = await studentTable.findOne({_id:id}).populate('request_send')
		return res.status(200).json(list.request_receive)
	} catch (error) {
		next(error)
	}
}

const acceptRequest = async (req, res, next) => {
	try {

	} catch (error) {
		next(error)
	}
}

const rejectRequest = async (req, res, next) => {
	try {

	} catch (error) {
		next(error)
	}
}



module.exports = {
	suggestedPeoples,
	sendRequest,
	acceptRequest,
	rejectRequest,
	connectionRequestReceivedList,
	connectionRequestSendList
}