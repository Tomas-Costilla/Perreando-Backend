const {hostRating} = require("../../dao/db")
const {CLOUDINARY_IMAGEURL} = require("../../config/globals")

const hostRatingService = () =>({
    async addRatingHostService(data){
        return hostRating.create(data)
    },
    async getRatingsInfoService(hostId){
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
    async checkGuestRatingService(hostId,guestId){
        try {
            let result = await hostRating.findOne({hostOwnerId: hostId,hostGuestId:guestId})
            if(result) return true
            else return false
        } catch (error) {
            return error.message            
        }
    }
})

module.exports = hostRatingService;