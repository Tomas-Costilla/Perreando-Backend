const {Schema,model} = require('mongoose')

const tokenModel = new Schema({
    tokenUserEmail: String,
    tokenNumberCode:Number
})

module.exports = model('tokens',tokenModel)