const {Schema,model, default: mongoose} = require("mongoose")

const hostModel = new Schema({
    hostOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    hostDescription:String,
    hostLocation:String,
    hostOwnerCapacity:Number,
    hostPrice:Number,
    hostTypeAnimals:String,
    hostGuests: {
        type: [
            {
                guestId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                }
            }
        ]
    }
})

hostModel.pre('findOne',function(){
    this.populate('hostOwnerId',{
        userFullName:1,
        userEmail:1,
        userImageName: 1
    })
    this.populate('hostGuests.guestId',{
        userFullName:1,
        userPhone:1,
        userImageName: 1
    })
})

module.exports = model('hosts',hostModel)