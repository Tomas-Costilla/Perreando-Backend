const services = require("../services")
const userController = require("./modules/userController")
const hostController = require("./modules/hostController")
const hostRatingController = require("./modules/hostRatingController")
const bookingController = require("./modules/bookingController")
const petController = require("./modules/petController")
const countryController = require("./modules/countryController")
const likeController = require("./modules/likeController")

module.exports = {
    userController: userController(services),
    hostController: hostController(services),
    hostRatingController: hostRatingController(services),
    bookingController: bookingController(services),
    petController: petController(services),
    countryController: countryController(services),
    likeController: likeController(services)    
}