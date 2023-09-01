const passport = require("passport")
require('../../middlewares/localAuth')(passport)
const {IsAuthenticated} = require("../../middlewares/isAuthenticaded")
const multer = require("multer")
const upload = multer({dest: 'uploads/'})


module.exports = (router,{userController})=>{
    router
        .get("/user",userController.firstUserRoute)
        .post("/user",upload.single('userPhoto'),userController.createUserController)
        .post("/user/signin",passport.authenticate('login',{failureRedirect:"/user/accessdenied"}),userController.loginUserController)
        .get("/user/accessdenied",userController.userLoginAccess)
        .post("/user/signup",userController.userSignUpController)
        .get("/user/ubications",userController.userGetAllUbicationController)
        .put("/user/:userId",userController.updateUserDataController)
        .get("/user/:id",IsAuthenticated,userController.userGetInfoController)
        .get("/user/paw/:userId",IsAuthenticated,userController.getPawUserInfoController)
        .put("/user/paw/:userId",IsAuthenticated,userController.updateUserPawController)
      /*   .get("/user/ubis",(req,res)=>{res.json("todo ok")}) */

    return router;
}