const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")


module.exports = (router,{notificationController}) => {
    router
        .get("/notification/:userId",IsAuthenticated,notificationController.getCountNotificationController)

    return router;
}