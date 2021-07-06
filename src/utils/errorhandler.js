

const errorHandler = (err,req,res,next) =>{
	if(err.stack){
		console.log(err)
	}
	res.status(err.status || 500)
	return res.json({
		message : err.message || err.msg ||"Internal Server Error",
		status : err.status || 500
	})
}

module.exports = errorHandler