const hostRepository = require("./modules/hostRepository");
const userRepository = require("./modules/userRepository");
const bookingRepository = require("./modules/bookingRepository")
const hostRatingRepository = require("./modules/hostRatingRepository")

module.exports = {
    userRepository: userRepository(),
    hostRepository: hostRepository(),
    bookingRepository: bookingRepository(),
    hostRatingRepository: hostRatingRepository()
}