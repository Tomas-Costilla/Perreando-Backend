const userService = require("./modules/userService")
const hostService = require("./modules/hostService")
const hostRatingService = require("./modules/hostRatingService")
const bookingService = require("./modules/bookingService")
const repositories = require("../repository")

module.exports = {
    userService: userService(repositories),
    hostService: hostService(repositories),
    hostRatingService: hostRatingService(repositories),
    bookingService: bookingService(repositories)
}