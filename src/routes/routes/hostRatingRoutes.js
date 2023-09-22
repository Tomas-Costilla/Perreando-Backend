const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")

module.exports = (router,{hostRatingController}) => {
    router
        .post("/rating",IsAuthenticated,hostRatingController.addRatingHost)
        .get("/rating/all/:id",IsAuthenticated,hostRatingController.getRatingsInfo)
        .get("/rating/:ratingId",IsAuthenticated,hostRatingController.getRatingByIdController)
        .get("/rating/host/:hostId/guest/:guestId",IsAuthenticated,hostRatingController.checkGuestRatingController)
        .put("/rating/update/:ratingId",IsAuthenticated,hostRatingController.updateRatingController)
        .delete("/rating/:ratingId",IsAuthenticated,hostRatingController.deleteRatingController)
    return router;
}