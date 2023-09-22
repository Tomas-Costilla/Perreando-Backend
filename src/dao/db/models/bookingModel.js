const {Schema,model, default: mongoose} = require('mongoose')

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
    bookingCreatedAt: {type: Date,default: Date.now}
})

module.exports = model('booking',bookingModel)