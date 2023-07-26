const path = require('path')
require('dotenv').config({path: path.resolve(__dirname,'../../.env')})

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SECRETTKN: process.env.SECRET_TOKEN,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_APIKEY: process.env.CLOUDINARY_APIKEY,
    CLOUDINARY_APISECRET: process.env.CLOUDINARY_APISECRET,
    CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
    CLOUDINARY_IMAGEURL: process.env.CLOUDINARY_IMAGEURL,
    API_GEO_URL: process.env.API_GEO_URL
}