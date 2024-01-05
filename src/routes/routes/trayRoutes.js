const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")


module.exports = (router,{trayController}) =>{
    router
        .post("/tray",IsAuthenticated,trayController.createTrayController)
        .get("/tray/:trayOwnerId",IsAuthenticated,trayController.getAllTrayController)
        .put("/tray/reject/:trayId",IsAuthenticated,trayController.rejectGuestReserveController)
        .put("/tray/confirm/:trayId",IsAuthenticated,trayController.confirmGuestReserveController)

    return router;
}