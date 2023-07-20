const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")

module.exports = (router,{hostRatingController}) => {
    router
        .post("/rating",IsAuthenticated,hostRatingController.addRatingHost)
        .get("/rating/all/:id",IsAuthenticated,hostRatingController.getRatingsInfo)
    return router;
}