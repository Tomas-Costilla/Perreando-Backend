const fs = require("fs")

const userController = ({userService}) =>({
    firstUserRoute(req,res){
        res.status(200).json({message: "primera ruta del usuario"})
    },
    async createUserController(req,res){
        let {path} = req.file
      /*   console.log(req.body); */
        try {
            await userService.createUser(req.body,req.file)
            res.status(200).json("Usuario creado con exito")
        } catch (error) {
            res.status(500).json(error.message)
        }
        /* delete image from server after upload */
        /* let filePath = `uploads/${filename}` */
        fs.access(path,error=>{
            if(!error) fs.unlinkSync(path)
            else console.log("ocurrio un error al querer eliminarlo");
        })

    },
    async loginUserController(req,res){
        try {
            let userDB = await userService.getUserbyId(req.user._id)
            res.json({user: userDB})
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    userLoginAccess(req,res){
        res.status(500).json("La contraseña es invalida o el usuario no existe")
    },
    userSignUpController(req,res){
        req.logout(()=> {
            res.status(200).json("Usuario deslogueado correctamente")
        })
    },
    async userGetInfoController(req,res){
        let {id} = req.params
        try {
            let result = await userService.getUserbyId(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error.message)
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
            res.json(result)
        } catch (error) {
            res.status(500).json({error: true, message: error.message})            
        }
    }
})
module.exports = userController; 