const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")

module.exports = (router,{hostRatingController}) => {
    router
        .post("/rating",IsAuthenticated,hostRatingController.addRatingHost)
        .get("/rating/all/:id",IsAuthenticated,hostRatingController.getRatingsInfo)
        .get("/rating/host/:hostId/guest/:guestId",IsAuthenticated,hostRatingController.checkGuestRatingController)
    return router;
}