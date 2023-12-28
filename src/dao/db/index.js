const userModel = require("./models/userModel")
const hostModel = require("./models/HostModel")
const hostRating = require("./models/hostRating")
const bookingModel = require("./models/bookingModel")
const tokenModel = require('./models/tokenModel')
const petModel = require('./models/petModel')
const countryModel = require('./models/countryModel')
const likeModel = require("./models/likeModel")

module.exports = {
    userModel,
    hostModel,
    hostRating,
    bookingModel,
    tokenModel,
    petModel,
    countryModel,
    likeModel
}