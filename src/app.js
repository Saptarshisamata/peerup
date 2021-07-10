const express = require('express')
const cors = require('cors')
const app = express()


const InitiateDB = require('./config/db')
const errorHandler = require('./utils/errorhandler')
const publicRoutes = require('./routes/route')

const PORT = 8001

app.use(express.json())
app.use(cors())

app.use('/', publicRoutes)

app.use(errorHandler)

InitiateDB().then(()=>{
	app.listen(PORT, (req, res) => {
		console.log(`server started at port ${PORT}`)
	})
})

// process.on('SIGTERM', () => {
// 	server.close(() => {
// 		console.log('Process terminated')
// 	})
// })

module.exports = app