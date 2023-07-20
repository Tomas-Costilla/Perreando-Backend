const controllers = require("../../controllers")
const userRoutes = require("./userRoutes")
const hostRoutes = require("./hostRoutes")
const hostRatingRoutes = require("./hostRatingRoutes")

module.exports = (router) =>({
    userRoutes: userRoutes(router,controllers),
    hostRoutes: hostRoutes(router,controllers),
    hostRatingRoutes:hostRatingRoutes(router,controllers)
})