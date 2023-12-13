const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")
const multer = require("multer")
const upload = multer({dest: 'uploads/'})

module.exports = (router,{hostController}) => {
    router
    .post("/",[IsAuthenticated,upload.array('hostPhotos',3)],hostController.createHost)
    .post("/guest",IsAuthenticated,hostController.addGuestToHost)
    .get("/search",IsAuthenticated,hostController.getInfobyUbicationController)
    .get("/:id",IsAuthenticated,hostController.getHostInfo)
    .get("/owner/:id",IsAuthenticated,hostController.getHostInfobyOwner)
    .put("/:id",IsAuthenticated,hostController.updateHost)
    .delete("/:id",IsAuthenticated,hostController.deleteHost)
    .get("/check/:ownerId",IsAuthenticated,hostController.checkExistHostController)
    .get("/guest/:guestId",IsAuthenticated,hostController.getGuestHostController)
    .get("/guestReserve/:guestId",IsAuthenticated,hostController.checkIfGuestReserveController)
    .delete("/:hostId/guest/:guestId",IsAuthenticated,hostController.deleteGuestFromHostController)
    .get("/guests/:hostId",IsAuthenticated,hostController.getHostGuestsController)
    .put("/guest/endbooking/:hostId",IsAuthenticated,hostController.EndBookingHostController)
    .delete("/:hostId/image/:imageName",IsAuthenticated,hostController.deleteHostImageController)
    .post("/:hostId/updateimage",[IsAuthenticated,upload.single('uploadImage')],hostController.addImageHostController)

    return router;
}