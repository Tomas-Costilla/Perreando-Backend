const {Schema,model, default: mongoose} = require('mongoose')
const moment = require("moment")
const momenttz = require('moment-timezone')
let dateNow = Date.now()
let dateArgetina = momenttz.tz("America/Argentina/Buenos_Aires")


const bookingModel = new Schema({
    bookingHostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"hosts"
    },
    bookingGuestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    bookingDateStart:Date,
    bookingDateEnd:Date,
    bookingState:String,
    bookingTotal:Number,
    bookingPetId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"pets"
    },
    bookingCreatedAt: {type: Date,default: dateArgetina}
})

module.exports = model('booking',bookingModel)