const {uploadImage,updateImage} = require("../../utils/cloudinary")

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
    async validateCodeResetPassword(userEmail,userCode){
        return userRepository.validateTokenPasswordReset(userEmail,userCode)
    },
    async changeUserPasswordService(userData){
        return userRepository.updateUserPassword(userData)
    },
    async userAcceptTermsService(userId){
        return userRepository.userAcceptTermsRepository(userId)
    }
})

module.exports = userService;