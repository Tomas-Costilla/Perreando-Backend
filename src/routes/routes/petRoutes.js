const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")
const multer = require("multer")
const upload = multer({dest: 'uploads/'})


module.exports = (router,{petController}) => {
    router
        .post("/pet",[IsAuthenticated,upload.single('petPhoto')],petController.createPetController)
        .get("/pet/:petId",IsAuthenticated,petController.getPetByIdController)
        .put("/pet/:petId",IsAuthenticated,petController.updatePetByIdController)
        .delete("/pet/:petId",IsAuthenticated,petController.deletePetByIdController)
        .put("/pet/:petId/:petImageName",[IsAuthenticated,upload.single('petPhoto')],petController.updatePetImageController)
        .get("/pet/owner/:ownerId",IsAuthenticated,petController.getPetsByOwnerController)

    return router;
}