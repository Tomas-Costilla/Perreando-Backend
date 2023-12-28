const passport = require("passport")
require('../../middlewares/localAuth')(passport)
const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")
const multer = require("multer")
const upload = multer({dest: 'uploads/'})


module.exports = (router,{userController})=>{
    router
        .get("/user",userController.firstUserRoute)
        .post("/user/resetpassword",userController.sendEmailToResetPasswordController)
        .get("/user/validatetokenpassword/:userEmail/:userCode",userController.validateCodeResetPasswordController)
        .put("/user/changeuserpassword",userController.changeUserPasswordController)
        .post("/user",upload.single('userPhoto'),userController.createUserController)
        .post("/user/signin",passport.authenticate('login',{failureRedirect:"/user/accessdenied"}),userController.loginUserController)
        .get("/user/accessdenied",userController.userErrorLogin)
        .post("/user/signup",userController.userSignUpController)
        .get("/user/ubications/:stateId",userController.userGetAllUbicationController)
        .get("/user/states",userController.getAllStateController)
        .put("/user/:userId",IsAuthenticated,userController.updateUserDataController)
        .get("/user/:id",IsAuthenticated,userController.userGetInfoController)
        .get("/user/paw/:userId",IsAuthenticated,userController.getPawUserInfoController)
        .put("/user/paw/:userId",IsAuthenticated,userController.updateUserPawController)
        .put("/user/:userId/image/:userImageName/update",[IsAuthenticated,upload.single('userPhoto')],userController.updatePawImage)
        .put("/user/terms/:userId",IsAuthenticated,userController.userAcceptTermsController)

    return router;
}