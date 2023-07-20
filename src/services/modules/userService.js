const {userModel} = require("../../dao/db");
const { createHash } = require("../../utils/bcrypt");
const {UserError} = require("../../utils/errors")
const {uploadImage} = require("../../utils/cloudinary")
const {CLOUDINARY_IMAGEURL} = require("../../config/globals")

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
    }
})

module.exports = userService;