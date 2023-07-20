const {Schema,model} = require("mongoose")

const userModel = new Schema({
    userFullName: String,
    userEmail:String,
    userPhone:Number,
    userPassword:String,
    userImageName:String,
    userUbication: String,
    userAddressStreet:String,
    userAddressNumber:Number,
    userAddressBetwStreet:String,
    userAddressExtraInfo:String,
    userProfile:String,
    userGuestAnimalName:String,
    userGuestAnimalAge:Number,
    userGuestAnimalWeight:Number,
    userGuestAnimalAge:Number,
    userGuestAnimalWeight:Number,
    userHostType:String,
    userHostCapacity:Number,
    userHostAnimalWeightFrom:Number,
    userHostAnimalWeightTo:Number,
    userHostAnimalAgeFrom:Number,
    userHostAnimalAgeTo:Number
})

module.exports = model('user',userModel)
