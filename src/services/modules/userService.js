const {userModel} = require("../../dao/db");
const { createHash } = require("../../utils/bcrypt");
const {UserError} = require("../../utils/errors")
const {uploadImage} = require("../../utils/cloudinary")
const {CLOUDINARY_IMAGEURL,API_GEO_URL} = require("../../config/globals")
const axios = require("axios")

const userService = () =>({
    async createUser(user,image){
        let newObject = {
            ...user,
            userImageName: image.filename
        }
        
        let userDB = await userModel.findOne({userEmail: newObject.userEmail})

        if(userDB) throw new UserError("El usuario ya esta registrado")

        let newPassword = createHash(newObject.userPassword)

        newObject.userPassword = newPassword

        /* Upload image to Storage */
        await uploadImage(image.path)

        return userModel.create(newObject)     
    },
    async getUserbyId(id){
        let userDB = await userModel.findById(id)
        return {
            ...userDB._doc,
            userFileUri: `${CLOUDINARY_IMAGEURL}${userDB.userImageName}.webp`
        }       
    },
    async getAllUbications(){
        try {
            let {data} = await axios.get(`${API_GEO_URL}?provincia=06&campos=id,nombre&orden=nombre&max=1000`)
            return data.localidades
        } catch (error) {
            return error.message
        }
    },
    async updateUserDate(userId,userData){
        try {
            await userModel.findByIdAndUpdate(userId,userData)
            return {message: "Datos actualizados con exito"}
        } catch (error) {
            throw new Error("No se pudo actualizar el usuario")
        }
    }
})

module.exports = userService;