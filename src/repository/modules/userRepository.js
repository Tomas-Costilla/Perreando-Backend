const { userModel, tokenModel } = require("../../dao/db");
const { createHash } = require("../../utils/bcrypt");
const { uploadImage, updateImage } = require("../../utils/cloudinary");
const {
  CLOUDINARY_IMAGEURL,
  API_GEO_URL,
  GMAIL_EMAIL,
  GMAIL_PASSWORD,
} = require("../../config/globals");
const nodemailer = require("nodemailer");
const baseRepository = require("../baseRepository");
const sendEmail = require("../../utils/email");

const userRepository = () => ({
  async createUser(userData, userImage) {
    let newUserObject = { ...userData, userImageName: userImage.filename };

    let userDB = await userModel.findOne({
      userEmail: newUserObject.userEmail,
    });

    if (userDB) throw new Error("El usuario ya esta registrado");

    let newPassword = createHash(newUserObject.userPassword);

    newUserObject.userPassword = newPassword;

    /* Upload image to Storage */
    await uploadImage(userImage.path);

    return baseRepository.createData(userModel, newUserObject);
  },
  async getUserById(userId) {
    let userDB = await userModel.findById({ _id: userId });
    if (!userDB) throw new Error("el usuario no existe");
    return {
      ...userDB._doc,
      userFileUri: `${CLOUDINARY_IMAGEURL}${userDB.userImageName}.webp`,
    };
  },
  async getLoginUserData(userId) {
    let userDB = await baseRepository.getDataById(userModel, userId);
    return {
      _id: userDB._id,
      userFullName: userDB.userFullName,
      userEmail: userDB.userEmail,
      userProfile: userDB.userProfile,
      userUbication: userDB.userUbication,
      userFileUri: `${CLOUDINARY_IMAGEURL}${userDB.userImageName}.webp`,
      userFirstLogin: userDB.userFirstLogin,
      userTermsAccept: userDB.userTermsAccept,
    };
  },
  async getAllTowns() {
    const response = await fetch(
      `${API_GEO_URL}?provincia=06&campos=id,nombre&orden=nombre&max=1000`
    );
    const data = await response.json();
    return data.localidades;
  },
  async updateUserData(userId, userData) {
    return baseRepository.updateDataById(userModel, userId, userData);
  },
  async getUserPawnData(userId) {
    let userData = await baseRepository.getDataById(userModel, userId);
    return {
      userImageName: userData.userImageName,
      userImageUrl: `${CLOUDINARY_IMAGEURL}${userData.userImageName}.webp`,
      userGuestAnimalName: userData.userGuestAnimalName,
      userGuestAnimalAge: userData.userGuestAnimalAge,
      userGuestAnimalWeight: userData.userGuestAnimalWeight,
    };
  },
  async updateUserPawnData(userId, pawnData) {
    return baseRepository.updateDataById(userModel, userId, pawnData);
  },
  async updateUserPawnImage(userId, oldPawnImage, newPawnImage) {
    await updateImage(oldPawnImage, newPawnImage.path);
    await userModel.findByIdAndUpdate(userId, {
      userImageName: newPawnImage.filename,
    });
    return `${CLOUDINARY_IMAGEURL}${newPawnImage.filename}.webp`;
  },
  async sendEmailToResetPassword(useremail) {
    let userDB = await userModel.findOne({ userEmail: useremail });
    if (!userDB) throw new Error("Este email no se encuentra registrado");
    let IsTokenExist = await tokenModel.findOne({ tokenUserEmail: useremail });
    if (IsTokenExist) await tokenModel.deleteOne({ tokenUserEmail: useremail });
    let randomCode =  Math.round(Math.random()*999999)
    await tokenModel.create({
      tokenUserEmail: useremail,
      tokenNumberCode: randomCode,
    });
    return sendEmail({
      addressee: useremail,
      subjectEmail: "Recupero de contraseña",
      textEmail: `Este es tu codigo para resetear la contraseña: ${randomCode}`,
    });
  },
  async validateTokenPasswordReset(userEmail,userCode) {
    let IsTokenExist = await tokenModel.findOne({ tokenUserEmail: userEmail, tokenNumberCode: userCode });
    if (IsTokenExist) {
      return tokenModel.deleteOne({ tokenUserEmail: userEmail });
    }
    throw new Error("Tu codigo de validacion expiró o no existe");
  },
  async updateUserPassword(userData) {
    let { userEmail, userNewPassword } = userData;
    let newPassword = createHash(userNewPassword);
    return userModel.updateOne(
      { userEmail: userEmail },
      { userPassword: newPassword }
    );
  },
  async userAcceptTermsRepository(userId){
    return userModel.updateOne({_id: userId},{
      userFirstLogin:false,
      userTermsAccept: true
    })
  }
});

module.exports = userRepository;
