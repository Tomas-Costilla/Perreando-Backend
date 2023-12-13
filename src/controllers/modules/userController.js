const deleteUploadFile = require("../../utils/deleteFile")

const userController = ({userService}) =>({
    firstUserRoute(req,res){
        res.status(200).json({message: "primera ruta del usuario"})
    },
    async createUserController(req,res){
        let {path} = req.file
        try {
            await userService.createUser(req.body,req.file)
            res.status(200).json({message: "Usuario creado con exito"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        /* delete image from server after upload */
        deleteUploadFile(path)
    },
    async loginUserController(req,res){
        try {
            let userDB = await userService.getLoginDataService(req.user._id)
            res.json({user: userDB})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    userErrorLogin(req,res){
        res.status(500).json({message: "La contraseña es invalida o el usuario no existe"})
    },
    userSignUpController(req,res){
        req.logout(()=> {
            res.status(200).json({message: "Usuario deslogueado con exito"})
        })
    },
    async userGetInfoController(req,res){
        let {id} = req.params
        try {
            let result = await userService.getUserbyId(id)
            res.status(200).json({message: "Informacion del usuario",result})
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    async userGetAllUbicationController(req,res){
        try {
            let result = await userService.getAllUbications()
            res.json({message: "Localidades disponibles",resultado: result})
        } catch (error) {
            res.status(500).json({message: "Existio un error en la peticion",error: error.message})
        }
    },
    async updateUserDataController(req,res){
        let {userId} = req.params
        try {
            const result = await userService.updateUserDate(userId,req.body)
            res.json({message:"Se ha actualizado con exito",result})
        } catch (error) {
            res.status(500).json({error: true, message: error.message})            
        }
    },
    async getPawUserInfoController(req,res){
        let {userId} = req.params
        try {
            const dataDB = await userService.getPawUserInfo(userId)
            res.json({message:"Informacion de la mascota",dataDB})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async updateUserPawController(req,res){
        let {userId} = req.params
        try {
            const result = await userService.updateUserPaw(userId,req.body)
            res.json({message:"Se ha actualizado los datos de tu mascota",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async updatePawImage(req,res){
        let {userId,userImageName} = req.params
        let {path} = req.file
        try {
            let result = await userService.updateImagePawService(userId,userImageName,req.file)
            res.json({message:"Imagen actualizada",newFileImageUri: result})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
        deleteUploadFile(path)
    },
    async sendEmailToResetPasswordController(req,res){
        let {userEmail} = req.body
        try {
            let result = await userService.sendEmailToResetPasswordService(userEmail)
            res.json({message:"Se envio con exito el correo",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async validateCodeResetPasswordController(req,res){
        let {userEmail,userCode} = req.params
        try {
            let result = await userService.validateCodeUser(userEmail,userCode)
            res.json({message:"Se ha validado con exito tu codigo",result})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    async changeUserPasswordController(req,res){
        try {
            let result = await userService.changeUserPasswordService(req.body)
            res.json({message:"Se ha modificado con exito tu contraseña",result})
        } catch (error) {
            res.status(500).json({message: error.message})            
        }
    }
})
module.exports = userController; 