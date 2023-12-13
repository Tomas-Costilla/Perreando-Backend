const cloudinary = require("cloudinary").v2
const {CLOUDINARY_APIKEY,CLOUDINARY_APISECRET,CLOUDINARY_CLOUDNAME} = require("../config/globals")

cloudinary.config({
    secure: true,
    api_key: CLOUDINARY_APIKEY,
    api_secret: CLOUDINARY_APISECRET,
    cloud_name: CLOUDINARY_CLOUDNAME
})

/* console.log(cloudinary.config()); */

// Uploads an image fil
/////////////////////////
const uploadImage = async (imagePath) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result.public_id;

};

const updateImage = async (oldImageName,newImagePath) =>{
    //delete image
      await cloudinary.uploader.destroy(oldImageName)
      let result = await uploadImage(newImagePath)
      return result
}

const deleteImage = async(imageName) => {
    return cloudinary.uploader.destroy(imageName)    
}

module.exports = {
    uploadImage,
    updateImage,
    deleteImage
}