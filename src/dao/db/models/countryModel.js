const {Schema,model, default: mongoose} = require('mongoose')


const countrySchema = new Schema({
    countryName: String
})


module.exports = model('countries',countrySchema)