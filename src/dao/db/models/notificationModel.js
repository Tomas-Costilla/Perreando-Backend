const {Schema,model, default: mongoose} = require("mongoose")


const notificationModel = new Schema({
    notificationUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    notificationMessage: String
})

module.exports = model('notifications',notificationModel)