const {Schema,model, default: mongoose} = require("mongoose")

const hostModel = new Schema({
    hostCountryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"countries"
    },
    hostOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    hostDescription:String,
    hostOwnerCapacity:Number,
    hostPrice:Number,
    hostTypeAnimals:String,
    hostAnimalWeightFrom:Number,
    hostAnimalWeightTo:Number,
    hostAnimalAgeFrom:Number,
    hostAnimalAgeTo:Number,
    hostState:String,
    hostCity:String,
    hostCompleteAddress:String,
    hostImages:{
        type:[
            {
                hostImageName: String
            }
        ]
    }
})

hostModel.pre('findOne',function(){
    this.populate('hostOwnerId',{
        userFullName:1,
        userEmail:1,
        userImageName: 1,
        userEmail:1,
        userPhone:1
        /* userUbication:1,
        userAddressStreet:1,
        userAddressNumber:1,
        userAddressBetwStreet:1,
        userAddressExtraInfo:1,
        userGuestAnimalName:1 */
    })
   /*  this.populate('hostGuests.guestId',{
        userFullName:1,
        userPhone:1,
        userImageName: 1,
        userEmail:1
    }) */
})



module.exports = model('hosts',hostModel)