const hostRepository = require("./modules/hostRepository");
const userRepository = require("./modules/userRepository");
const bookingRepository = require("./modules/bookingRepository")
const hostRatingRepository = require("./modules/hostRatingRepository")
const petRepository = require("./modules/petRepository")
const countryRepository = require('./modules/countryRepository')
const likeRepository = require("./modules/likeRepository")
const trayRepository = require("./modules/trayRepository")
const notificationRepository = require("./modules/notificationRepository")

module.exports = {
    userRepository: userRepository(),
    hostRepository: hostRepository(),
    bookingRepository: bookingRepository(),
    hostRatingRepository: hostRatingRepository(),
    petRepository: petRepository(),
    countryRepository: countryRepository(),
    likeRepository: likeRepository(),
    trayRepository:trayRepository(),
    notificationRepository: notificationRepository()
}