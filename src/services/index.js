const userService = require("./modules/userService")
const hostService = require("./modules/hostService")
const hostRatingService = require("./modules/hostRatingService")
const bookingService = require("./modules/bookingService")

module.exports = {
    userService: userService(),
    hostService: hostService(),
    hostRatingService: hostRatingService(),
    bookingService: bookingService()
}