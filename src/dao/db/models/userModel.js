const {Schema,model,default: mongoose} = require("mongoose")

const userModel = new Schema({
    userFullName: String,
    userEmail:String,
    userPhone:Number,
    userPassword:String,
    userImageName:String,
    /* userUbication: String,
    userAddressStreet:String,
    userAddressNumber:Number,
    userAddressBetwStreet:String */
    userAddress:String,
    userAddressExtraInfo:String,
    userProfile:String,
    userFirstLogin:Boolean,
    userTermsAccept:Boolean,
    userCountryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"countries"
    }
})
module.exports = model('user',userModel)
