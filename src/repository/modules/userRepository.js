const {userModel,tokenModel} = require("../../dao/db");
const { createHash } = require("../../utils/bcrypt");
const {uploadImage,updateImage} = require("../../utils/cloudinary")
const {CLOUDINARY_IMAGEURL,API_GEO_URL, GMAIL_EMAIL, GMAIL_PASSWORD} = require("../../config/globals")
const nodemailer = require('nodemailer');
const baseRepository = require("../baseRepository")

const userRepository = () =>({
    async createUser(userData,userImage){
        let newUserObject = {...userData,userImageName: userImage.filename}
    
        let userDB = await userModel.findOne({userEmail: newObject.userEmail})

        if(userDB) throw new Error("El usuario ya esta registrado")

        let newPassword = createHash(newObject.userPassword)

        newUserObject.userPassword = newPassword

        /* Upload image to Storage */
        await uploadImage(userImage.path)

        return baseRepository.createData(userModel,newUserObject)
    },
    async getUserById(userId){
        console.log(userId)
        let userDB = await userModel.findById({_id: userId})
        if(!userDB) throw new Error("el usuario no existe")
        return {
            ...userDB._doc,
            userFileUri: `${CLOUDINARY_IMAGEURL}${userDB.userImageName}.webp`
        }
    },
    async getLoginUserData(userId){
        let userDB = await baseRepository.getDataById(userModel,userId)
        return {
            _id:userDB._id,
            userFullName: userDB.userFullName,
            userEmail:userDB.userEmail,
            userProfile:userDB.userProfile,
            userUbication: userDB.userUbication,
            userFileUri: `${CLOUDINARY_IMAGEURL}${userDB.userImageName}.webp`
        }
    },
    async getAllTowns(){
        const response = await fetch(`${API_GEO_URL}?provincia=06&campos=id,nombre&orden=nombre&max=1000`)
        const data = await response.json()

        return data.localidades
    },
    async updateUserData(userId,userData){
        return baseRepository.updateDataById(userModel,userId,userData)
    },
    async getUserPawnData(userId){
        let userData = await baseRepository.getDataById(userModel,userId)
        return {
            userImageName: userData.userImageName,
            userImageUrl:`${CLOUDINARY_IMAGEURL}${userData.userImageName}.webp`,
            userGuestAnimalName: userData.userGuestAnimalName,
            userGuestAnimalAge: userData.userGuestAnimalAge,
            userGuestAnimalWeight: userData.userGuestAnimalWeight
        }
    },
    async updateUserPawnData(userId,pawnData){
        return baseRepository.updateDataById(userModel,userId,pawnData)
    },
    async updateUserPawnImage(userId,oldPawnImage,newPawnImage){
        await updateImage(oldPawnImage,newPawnImage.path)
        await userModel.findByIdAndUpdate(userId,{
            userImageName: newPawnImage.filename
        })
        return `${CLOUDINARY_IMAGEURL}${newPawnImage.filename}.webp`
    },
    async sendEmailToResetPassword(useremail){
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
        let randomCode = Math.round(Math.random()*999999)
        const mailBody = {
            from: GMAIL_EMAIL,
            to: useremail,
            subject: 'Recupero de contraseña',
            text: `Este es tu codigo para resetear la contraseña: ${randomCode}`
        }
        let userDB = await userModel.findOne({userEmail: useremail})
        if(!userDB) throw new Error("Este email no se encuentra registrado")
        let IsTokenExist = await tokenModel.findOne({tokenUserEmail: useremail})
        if(IsTokenExist) await tokenModel.deleteOne({tokenUserEmail: useremail})
        await tokenModel.create({tokenUserEmail: useremail,tokenNumberCode:randomCode})
        await transporter.sendMail(mailBody)
        return {message: "Se ha enviado el mail para recupero de contraseña correctamente",result:true}
    },
    async validateTokenPasswordReset(userEmail){
        let IsTokenExist = await tokenModel.findOne({tokenUserEmail: userEmail})
        if(IsTokenExist){
            await tokenModel.deleteOne({tokenUserEmail: userEmail})
            return {message: "Codigo validado con exito",result: true}
        }
        throw new Error("Tu codigo de validacion expiró o no existe")
    },
    async updateUserPassword(userData){
        let {userEmail,userNewPassword} = userData
        /* let {userEmail,userNewPassword} = userData
        try {
            let newPassword = createHash(userNewPassword)
            await userModel.updateOne({userEmail: userEmail},{userPassword: newPassword})
            return {message: "Contraseña actualizada con exito",result: true}
        } catch (error) {
            return error.message
        } */
    }
})

module.exports = userRepository;