const userService = require("./modules/userService")
const hostService = require("./modules/hostService")
const hostRatingService = require("./modules/hostRatingService")
const bookingService = require("./modules/bookingService")
const petService = require("./modules/petService")
const countryService = require("./modules/countryService")
const likeService = require("./modules/likeService")
const repositories = require("../repository")


module.exports = {
    userService: userService(repositories),
    hostService: hostService(repositories),
    hostRatingService: hostRatingService(repositories),
    bookingService: bookingService(repositories),
    petService: petService(repositories),
    countryService: countryService(repositories),
    likeService: likeService(repositories)
}