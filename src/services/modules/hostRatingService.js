const hostRatingService = ({hostRatingRepository}) =>({
    async addRatingHostService(data){
        return hostRatingRepository.addRatingHostRepository(data)
    },
    async getRatingsInfoService(hostId){
        return hostRatingRepository.getRatingsInfoRepository(hostId)
    },
    async checkGuestRatingService(hostId,guestId){
       return hostRatingRepository.checkGuestRatingRepository(hostId,guestId)
    },
    async getRatingById(ratingId){
       return hostRatingRepository.getRatingByIdRepository(ratingId)
    },
    async updateRating(ratingId,data){
        return hostRatingRepository.updateRatingRepository(ratingId,data)
    },
    async deleteRating(ratingId){
        return hostRatingRepository.deleteRatingRepository(ratingId)
    }
})

module.exports = hostRatingService;