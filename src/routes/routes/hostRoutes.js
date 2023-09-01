const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")


module.exports = (router,{hostController}) => {
    router
    .post("/host",IsAuthenticated,hostController.createHost)
    .post("/host/guest",IsAuthenticated,hostController.addGuestToHost)
    .get("/host/search",IsAuthenticated,hostController.getInfobyUbicationController)
    .get("/host/:id",IsAuthenticated,hostController.getHostInfo)
    .get("/host/owner/:id",IsAuthenticated,hostController.getHostInfobyOwner)
    .put("/host/:id",IsAuthenticated,hostController.updateHost)
    .delete("/host/:id",IsAuthenticated,hostController.deleteHost)
    .get("/host/check/:ownerId",IsAuthenticated,hostController.checkExistHostController)
    .get("/host/guest/:guestId",IsAuthenticated,hostController.getGuestHostController)
    .get("/host/guestReserve/:guestId",IsAuthenticated,hostController.checkIfGuestReserveController)
    .delete("/host/guest/:hostId/:userEmail",IsAuthenticated,hostController.deleteGuestFromHostController)

    return router;
}