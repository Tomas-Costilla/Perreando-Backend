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
            if(result) return {message: "Tu comentario",result: result._id}
            else return {message: "Aun no has calificado este hospedaje",result: false}
        } catch (error) {
            return error.message            
        }
    },
    async getRatingById(ratingId){
        try {
            let result = await hostRating.findById(ratingId)
            return {message:"Tu comentario",result}
        } catch (error) {
            return error.message
        }
    },
    async updateRating(ratingId,data){
        try {
            let response = await hostRating.updateOne({_id: ratingId},{
                hostGuestRating: data.hostGuestRating,
                hostGuestComment: data.hostGuestComment
            })
            return {message: "Se ha modificado con exito tu comentario",result: true}
        } catch (error) {
            return error.message
        }
    },
    async deleteRating(ratingId){
        try {
            await hostRating.deleteOne({_id: ratingId})
            return {message: "Se ha eliminado tu comentario",result: true}
        } catch (error) {
            return error.message
        }
    }
})

module.exports = hostRatingService;