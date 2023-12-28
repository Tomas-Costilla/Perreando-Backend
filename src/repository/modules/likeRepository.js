const { CLOUDINARY_IMAGEURL } = require("../../config/globals")
const {likeModel} = require("../../dao/db")
const baseRepository = require("../baseRepository")

const likeRepository = () => ({
    async addLikeRepository(likeData){
        return baseRepository.createData(likeModel,likeData)
    },
    async checkLikeRepository(hostId,guestId){
        let likeBD = await likeModel.findOne({likeHostId: hostId,likeGuestId: guestId})
        if(likeBD) return true
        else return false
    },
    async getAllLikesRepository(guestId){
        let likesDB = await likeModel.find({likeGuestId: guestId})
            .populate('likeHostId',{
                hostDescription:1,
                hostOwnerId:1,
                hostImages:1
            })

        if(likesDB.length===0) return []
        
        return likesDB.map(item=> {
            return {
                _id:item._id,
                hostId: item.likeHostId,
                likeHostId: item.likeHostId?._id ? item.likeHostId?._id : false,
                hostOwnerId: item.likeHostId?.hostOwnerId ? item.likeHostId?.hostOwnerId : false,
                hostDescription: item.likeHostId?.hostDescription ? item.likeHostId?.hostDescription : "Esta publicacion ya no existe",
                hostImage: item.likeHostId?.hostImages ? `${CLOUDINARY_IMAGEURL}${item.likeHostId?.hostImages[0].hostImageName}` : false 
            }
        })

    },
    async deleteLikeRepository(hostId,guestId){
        return likeModel.findOneAndDelete({likeHostId: hostId,likeGuestId: guestId})
    }
})

module.exports = likeRepository;