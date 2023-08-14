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

   /*  console.log(imagePath); */

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

module.exports = {
    uploadImage
}