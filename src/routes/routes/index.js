const controllers = require("../../controllers")
const userRoutes = require("./userRoutes")
const hostRoutes = require("./hostRoutes")
const hostRatingRoutes = require("./hostRatingRoutes")
const bookingRoutes = require("./bookingRoutes")
const petRoutes = require("./petRoutes")
const countryRoutes = require('./countryRoutes')
const likeRoutes = require("./likeRoutes")
const trayRoutes = require("./trayRoutes")
const notificationRoutes = require("./notificationRoutes")

module.exports = (router) =>({
    userRoutes: userRoutes(router,controllers),
    hostRoutes: hostRoutes(router,controllers),
    hostRatingRoutes:hostRatingRoutes(router,controllers),
    bookingRoutes:bookingRoutes(router,controllers),
    petRoutes: petRoutes(router,controllers),
    countryRoutes: countryRoutes(router,controllers),
    likeRoutes: likeRoutes(router,controllers),
    trayRoutes: trayRoutes(router,controllers),
    notificationRoutes: notificationRoutes(router,controllers)

})