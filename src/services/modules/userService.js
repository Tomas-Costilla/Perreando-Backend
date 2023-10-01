const {userModel, tokenModel} = require("../../dao/db");
const { createHash } = require("../../utils/bcrypt");
const {UserError} = require("../../utils/errors")
const {uploadImage,updateImage} = require("../../utils/cloudinary")
const {CLOUDINARY_IMAGEURL,API_GEO_URL, GMAIL_EMAIL, GMAIL_PASSWORD} = require("../../config/globals")
const axios = require("axios")
const nodemailer = require('nodemailer')

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
            userUbication: userDB.userUbication,
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
    },
    async sendEmailToResetPasswordService(email){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: GMAIL_EMAIL,
                pass: GMAIL_PASSWORD   
            },
            tls:{
                rejectUnauthorized: false
            }
        })
        let codigoRandom = Math.round(Math.random()*999999)
        const mailOptions = {
            from: GMAIL_EMAIL,
            to: email,
            subject: 'Recupero de contraseña',
            text: `Este es tu codigo para resetear la contraseña: ${codigoRandom}`
          };

          try {
                let userDB = await userModel.findOne({userEmail: email})
                if(!userDB) throw new Error("Este email no se encuentra registrado")
                if(await this.checkIfCodePasswordResetExist(email)){
                    await this.deleteCodePasswordReset(email)
                }
                await this.createCodePasswordReset(email,codigoRandom)
                await transporter.sendMail(mailOptions)
                return {message:"Se realizo el envio del mail",result: true}
          } catch (error) {
                throw new Error(error.message)
                /* return error.message */
          }
    },
    async checkIfCodePasswordResetExist(userEmail){
        try {
            let exists = await tokenModel.findOne({tokenUserEmail: userEmail})
            return exists ? true : false
        } catch (error) {
            return error.message
        }
    },
    async createCodePasswordReset(userEmail,code){
        try {
            await tokenModel.create({tokenUserEmail: userEmail,tokenNumberCode:code})
            return true
        } catch (error) {
            return error.message
        }
    },
    async deleteCodePasswordReset(userEmail){
        try {
            let result = await tokenModel.deleteOne({tokenUserEmail: userEmail})
            return result.deletedCount > 0 ? true : false
        } catch (error) {
            return error.message
        }
    },
    async validateCodeResetPassword(userEmail){
        try {
            if(await this.checkIfCodePasswordResetExist(userEmail)){
                await this.deleteCodePasswordReset(userEmail)
                return {message: "Codigo validado con exito",result: true}
            }
            
            throw new Error("Tu codigo de validacion expiró o no existe")
        } catch (error) {
            return error.message
        }
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