
const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model("blacklisted",tokenSchema)