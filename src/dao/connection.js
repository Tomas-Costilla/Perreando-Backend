const mongoose = require('mongoose')
const {MONGO_URI} = require("../config/globals")
const {DBConnectionError} = require("../utils/errors")

module.exports = async()=>{
    try {
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        return "DB connected"
    } catch (error) {
        throw new DBConnectionError(error.message)
    }
}