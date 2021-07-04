const express = require('express')
const cors = require('cors')
const app = express()


const InitiateDB = require('./config/db')
const errorHandler = require('./utils/errorhandler')
const publicRoutes = require('./routes/route')

app.use(express.json())
app.use(cors())

app.use('/',publicRoutes)

app.use(errorHandler)

InitiateDB().then(()=>{
	app.listen(8001,(req,res)=>{
		console.log(`server started at port 8001`)
	})
})
