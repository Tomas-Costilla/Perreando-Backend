const passport = require("passport")
require('../../middlewares/localAuth')(passport)
const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")
const multer = require("multer")
const upload = multer({dest: 'uploads/'})


module.exports = (router,{userController})=>{
    router
        .get("/",userController.firstUserRoute)
        .post("/resetpassword",userController.sendEmailToResetPasswordController)
        .get("/validatetokenpassword/:userEmail/:userCode",userController.validateCodeResetPasswordController)
        .put("/changeuserpassword",userController.changeUserPasswordController)
        .post("/",upload.single('userPhoto'),userController.createUserController)
        .post("/signin",passport.authenticate('login',{failureRedirect:"/accessdenied"}),userController.loginUserController)
        .get("/accessdenied",userController.userErrorLogin)
        .post("/signup",userController.userSignUpController)
        .get("/ubications",userController.userGetAllUbicationController)
        .put("/:userId",IsAuthenticated,userController.updateUserDataController)
        .get("/:id",IsAuthenticated,userController.userGetInfoController)
        .get("/paw/:userId",IsAuthenticated,userController.getPawUserInfoController)
        .put("/paw/:userId",IsAuthenticated,userController.updateUserPawController)
        .put("/:userId/image/:userImageName/update",[IsAuthenticated,upload.single('userPhoto')],userController.updatePawImage)

    return router;
}