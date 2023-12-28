const {Schema,model, default: mongoose} = require('mongoose')

const likeModel = new Schema({
    likeHostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"hosts"
    },
    likeGuestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})


module.exports = model('likes',likeModel)