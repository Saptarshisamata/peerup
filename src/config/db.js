const mongoose = require('mongoose')

const MONGOURI = "mongodb://localhost:27017/peer_up"

module.exports = async () => {
	try{
		await mongoose.connect(MONGOURI,{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		console.log('database connected')
	}catch(e){
		console.error(e)
	}
}