const userService = require("./modules/userService")
const hostService = require("./modules/hostService")
const hostRatingService = require("./modules/hostRatingService")

module.exports = {
    userService: userService(),
    hostService: hostService(),
    hostRatingService: hostRatingService()
}