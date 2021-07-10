const express = require('express')

const router = express.Router()

//route for get a user details
router.get('/user/:user_id',(req,res,next)=>{
	const user_id = req.params.user_id
})

//route for get all user
router.get('/get_all_users')

//route for edit in user


//route for delete a user


module.exports = router