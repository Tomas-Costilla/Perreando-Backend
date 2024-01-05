const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")
const multer = require("multer")
const upload = multer({dest: 'uploads/'})

module.exports = (router,{hostController}) => {
    router
    .post("/host",[IsAuthenticated,upload.array('hostPhotos',3)],hostController.createHost)
    .get("/host/filter",IsAuthenticated,hostController.getHostByFiltersController)
    .get("/host/search",IsAuthenticated,hostController.getInfobyUbicationController)
    .post("/host/guest",IsAuthenticated,hostController.addGuestToHost)
    .get("/host/:id",IsAuthenticated,hostController.getHostInfo)
    .get("/host/owner/:id",IsAuthenticated,hostController.getHostInfobyOwner)
    .get("/host/status/:ownerId",IsAuthenticated,hostController.getHostStatusController)
    .put("/host/:id",IsAuthenticated,hostController.updateHost)
    .delete("/host/:id",IsAuthenticated,hostController.deleteHost)
    .get("/host/check/:ownerId",IsAuthenticated,hostController.checkExistHostController)
    .get("/host/guest/:guestId",IsAuthenticated,hostController.getGuestHostController)
    .get("/host/guestReserve/:guestId",IsAuthenticated,hostController.checkIfGuestReserveController)
    .delete("/host/:hostId/guest/:guestId",IsAuthenticated,hostController.deleteGuestFromHostController)
    .get("/host/guests/:hostId",IsAuthenticated,hostController.getHostGuestsController)
    .put("/host/guest/endbooking/:hostId",IsAuthenticated,hostController.EndBookingHostController)
    .delete("/host/:hostId/image/:imageName",IsAuthenticated,hostController.deleteHostImageController)
    .post("/host/:hostId/updateimage",[IsAuthenticated,upload.single('uploadImage')],hostController.addImageHostController)
    .put("/host/state/:hostId",IsAuthenticated,hostController.changeHostStatusController)

    return router;
}

/*     /* .get("/host/search",IsAuthenticated,hostController.getInfobyUbicationController) */ 