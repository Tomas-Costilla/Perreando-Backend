const {Schema,model,default: mongoose} = require("mongoose")

const hostRating = new Schema({
    hostOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"hosts"
    },
    hostGuestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    hostGuestRating:Number,
    hostGuestComment:String
})

hostRating.pre('find',function(){
    this.populate('hostGuestId',{
        userFullName:1,
        userImageName: 1
    })
})


module.exports = model('hostrating',hostRating)