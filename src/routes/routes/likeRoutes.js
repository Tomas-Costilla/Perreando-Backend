const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")

module.exports = (router,{likeController}) => {
    router
        .post("/like",IsAuthenticated,likeController.addLikeController)
        .get("/like/:hostId/:guestId",IsAuthenticated,likeController.checkLikeController)
        .get("/like/:guestId",IsAuthenticated,likeController.getAllLikesController)
        .delete("/like/:hostId/:guestId",IsAuthenticated,likeController.deleteLikeController)

    return router
}