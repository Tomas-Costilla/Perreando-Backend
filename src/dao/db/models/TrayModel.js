const {Schema,model, default: mongoose} = require("mongoose")

const trayModel = new Schema({
    trayOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    trayBookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking"
    },
    trayStatus:{
        type: String,
        enum: ['Aceptada','Rechazada','Pendiente']
    }
})

module.exports = model('tray',trayModel)
