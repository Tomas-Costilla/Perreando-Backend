const {Schema,model,default: mongoose} = require("mongoose")

const petModel = new Schema({
    petOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    petName:String,
    petAge:Number,
    petWeight:String,
    petType:{
        type: String,
        default: "Perro"
    },
    petImageName:String
})

module.exports = model('pets',petModel)