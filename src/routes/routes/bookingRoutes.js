const { IsAuthenticated } = require("../../middlewares/isAuthenticaded");

module.exports = (router,{bookingController}) =>{
    router
        .get("/booking/host/:hostId",IsAuthenticated,bookingController.getAllBookingHostController)
        .get("/booking/guest/:guestId",IsAuthenticated,bookingController.getAllBookingGuestController)
        .post("/booking",IsAuthenticated,bookingController.createBookingController)
        .put("/booking/guest/end/:bookingId",IsAuthenticated,bookingController.endBookingGuestController)
        .put("/booking/guest/cancel/:bookingId",IsAuthenticated,bookingController.cancelBookingGuestController)
        .get("/booking/guest/active/:guestId",IsAuthenticated,bookingController.getAllActiveBookingController)

    return router;
}