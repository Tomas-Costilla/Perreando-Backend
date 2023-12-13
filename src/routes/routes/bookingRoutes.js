const { IsAuthenticated } = require("../../middlewares/isAuthenticaded");

module.exports = (router,{bookingController}) =>{
    router
        .get("/host/:hostId",IsAuthenticated,bookingController.getAllBookingHostController)
        .get("/guest/:guestId",IsAuthenticated,bookingController.getAllBookingGuestController)
        .post("/",IsAuthenticated,bookingController.createBookingController)
        .put("/guest/end/:bookingId",IsAuthenticated,bookingController.endBookingGuestController)
        .put("/guest/cancel/:bookingId",IsAuthenticated,bookingController.cancelBookingGuestController)

    return router;
}