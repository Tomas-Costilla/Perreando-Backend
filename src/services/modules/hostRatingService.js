const {hostRating} = require("../../dao/db")

const hostRatingService = () =>({
    async addRatingHostService(data){
        return hostRating.create(data)
    },
    async getRatingsInfoService(hostId){
        return hostRating.find({hostOwnerId: hostId})
    }
})

module.exports = hostRatingService;