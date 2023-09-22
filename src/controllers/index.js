const services = require("../services")
const userController = require("./modules/userController")
const hostController = require("./modules/hostController")
const hostRatingController = require("./modules/hostRatingController")
const bookingController = require("./modules/bookingController")

module.exports = {
    userController: userController(services),
    hostController: hostController(services),
    hostRatingController: hostRatingController(services),
    bookingController: bookingController(services)    
}