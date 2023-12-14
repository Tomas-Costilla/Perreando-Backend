const hostRepository = require("./modules/hostRepository");
const userRepository = require("./modules/userRepository");
const bookingRepository = require("./modules/bookingRepository")
const hostRatingRepository = require("./modules/hostRatingRepository")
const petRepository = require("./modules/petRepository")
const countryRepository = require('./modules/countryRepository')

module.exports = {
    userRepository: userRepository(),
    hostRepository: hostRepository(),
    bookingRepository: bookingRepository(),
    hostRatingRepository: hostRatingRepository(),
    petRepository: petRepository(),
    countryRepository: countryRepository(),
}