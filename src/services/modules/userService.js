const {userModel, tokenModel} = require("../../dao/db");
const { createHash } = require("../../utils/bcrypt");
const {UserError} = require("../../utils/errors")
const {uploadImage,updateImage} = require("../../utils/cloudinary")
const {CLOUDINARY_IMAGEURL,API_GEO_URL, GMAIL_EMAIL, GMAIL_PASSWORD} = require("../../config/globals")
const nodemailer = require('nodemailer')

const userService = ({userRepository}) =>({
    async createUser(user,image){
        return userRepository.createUser(user,image)     
    },
    async getUserbyId(userId){
        return userRepository.getUserById(userId)
    },
    async getLoginDataService(userId){
        return userRepository.getLoginUserData(userId)
    },
    async getAllUbications(){
        return userRepository.getAllTowns()
    },
    async updateUserDate(userId,userData){
       return userRepository.updateUserData(userId,userData)
    },
    async getPawUserInfo(userId){
        return userRepository.getUserPawnData(userId)
    },
    async updateUserPaw(userId,data){
        return userRepository.updateUserPawnData(userId,data)
    },
    async updateImagePawService(userId,oldImageName,image){
        return userRepository.updateUserPawnImage(userId,oldImageName,image)
    },
    async sendEmailToResetPasswordService(email){
        return userRepository.sendEmailToResetPassword(email)
    },
    async validateCodeResetPassword(userEmail){
        return userRepository.validateTokenPasswordReset(userEmail)
    },
    async changeUserPasswordService(userData){
        let {userEmail,userNewPassword} = userData
        try {
            let newPassword = createHash(userNewPassword)
            await userModel.updateOne({userEmail: userEmail},{userPassword: newPassword})
            return {message: "Contraseña actualizada con exito",result: true}
        } catch (error) {
            return error.message
        }
    },
    async validateCodeUser(userEmail,userCode){
        try {
            let result = await tokenModel.findOne({tokenUserEmail: userEmail,tokenNumberCode: userCode})
            if(result) {
                this.deleteCodePasswordReset(userEmail)
                return {message: "Validado con exito",result: true}
            }
            throw new Error("El codigo de validacion es incorrecto")
        } catch (error) {
            throw new Error(error.message)            
        }
    }
})

module.exports = userService;