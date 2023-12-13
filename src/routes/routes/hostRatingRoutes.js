const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")

module.exports = (router,{hostRatingController}) => {
    router
        .post("/",IsAuthenticated,hostRatingController.addRatingHost)
        .get("/all/:id",IsAuthenticated,hostRatingController.getRatingsInfo)
        .get("/:ratingId",IsAuthenticated,hostRatingController.getRatingByIdController)
        .get("/host/:hostId/guest/:guestId",IsAuthenticated,hostRatingController.checkGuestRatingController)
        .put("/update/:ratingId",IsAuthenticated,hostRatingController.updateRatingController)
        .delete("/:ratingId",IsAuthenticated,hostRatingController.deleteRatingController)
    return router;
}