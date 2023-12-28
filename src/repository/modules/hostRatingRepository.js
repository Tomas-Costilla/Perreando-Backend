const {hostRating} = require("../../dao/db")
const baseRepository = require("../baseRepository")
const {CLOUDINARY_IMAGEURL} = require("../../config/globals")


const hostRatingRepository = () =>({
    async addRatingHostRepository(data){
        return baseRepository.createData(hostRating,data)
    },
    async getRatingsInfoRepository(hostId){
        let ratingData = await hostRating.find({hostOwnerId: hostId})
        let newRatingData = ratingData.map(item=>{
            return {
                _id: item._id,
                hostOwnerId: item.hostGuestId._id,
                userFullName: item.hostGuestId.userFullName,
                userImageUri: `${CLOUDINARY_IMAGEURL}${item.hostGuestId.userImageName}`,
                hostGuestRating: item.hostGuestRating,
                hostGuestComment: item.hostGuestComment
            
            }
        })
        return newRatingData;
    },
    async checkGuestRatingRepository(hostId,guestId){
            let result = await hostRating.findOne({hostOwnerId: hostId,hostGuestId:guestId})
            if(!result) return {}
            
            return result

    },
    async getRatingByIdRepository(ratingId){
        return hostRating.findById(ratingId)
    },
    async updateRatingRepository(ratingId,data){
            return hostRating.updateOne({_id: ratingId},{
                hostGuestRating: data.hostGuestRating,
                hostGuestComment: data.hostGuestComment
            })
           
    },
    async deleteRatingRepository(ratingId){
        return hostRating.deleteOne({_id: ratingId})
    }
})

module.exports = hostRatingRepository;