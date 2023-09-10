const {userModel} = require("../../dao/db");
const { createHash } = require("../../utils/bcrypt");
const {UserError} = require("../../utils/errors")
const {uploadImage,updateImage} = require("../../utils/cloudinary")
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
    async getLoginDataService(userId){
        let userDB = await userModel.findById(userId)
        return {
            _id:userDB._id,
            userFullName: userDB.userFullName,
            userEmail:userDB.userEmail,
            userProfile:userDB.userProfile,
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
    },
    async getPawUserInfo(userId){
        try {
            let userData = await userModel.findById(userId)
            return {
                userImageName: userData.userImageName,
                userImageUrl:`${CLOUDINARY_IMAGEURL}${userData.userImageName}.webp`,
                userGuestAnimalName: userData.userGuestAnimalName,
                userGuestAnimalAge: userData.userGuestAnimalAge,
                userGuestAnimalWeight: userData.userGuestAnimalWeight
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async updateUserPaw(userId,data){
        try {
            let result = await userModel.findByIdAndUpdate(userId,data)
            return "Datos actualizados"
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async updateImagePawService(userId,oldImageName,image){
        try {
            await updateImage(oldImageName,image.path)
            let result = await userModel.findByIdAndUpdate(userId,{
                userImageName: image.filename
            })
            let newFileImageUri = `${CLOUDINARY_IMAGEURL}${image.filename}.webp`
            return newFileImageUri
        } catch (error) {
            return error.message
        }
    }
})

module.exports = userService;