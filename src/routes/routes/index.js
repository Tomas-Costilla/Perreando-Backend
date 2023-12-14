const controllers = require("../../controllers")
const userRoutes = require("./userRoutes")
const hostRoutes = require("./hostRoutes")
const hostRatingRoutes = require("./hostRatingRoutes")
const bookingRoutes = require("./bookingRoutes")
const petRoutes = require("./petRoutes")

module.exports = (router) =>({
    userRoutes: userRoutes(router,controllers),
    hostRoutes: hostRoutes(router,controllers),
    hostRatingRoutes:hostRatingRoutes(router,controllers),
    bookingRoutes:bookingRoutes(router,controllers),
    petRoutes: petRoutes(router,controllers)
})