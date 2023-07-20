const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")


module.exports = (router,{hostController}) => {
    router
        .post("/host",IsAuthenticated,hostController.createHost)
        .post("/host/guest",IsAuthenticated,hostController.addGuestToHost)
        .get("/host/:id",IsAuthenticated,hostController.getHostInfo)
        .get("/host/owner/:id",IsAuthenticated,hostController.getHostInfobyOwner)
        .put("/host",IsAuthenticated,hostController.updateHost)
        .delete("/host/:id",IsAuthenticated,hostController.deleteHost)

    return router;
}