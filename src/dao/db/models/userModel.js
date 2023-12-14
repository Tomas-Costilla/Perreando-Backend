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
    userFirstLogin:Boolean,
    userTermsAccept:Boolean
})
module.exports = model('user',userModel)
