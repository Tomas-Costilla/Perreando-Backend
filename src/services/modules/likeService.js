const likeService = ({likeRepository}) =>({
    async addLikeService(likeData){
        return likeRepository.addLikeRepository(likeData)
    },
    async checkLikeService(hostId,guestId){
        return likeRepository.checkLikeRepository(hostId,guestId)
    },
    async getAllLikesService(guestId){
        return likeRepository.getAllLikesRepository(guestId)
    },
    async deleteLikeService(hostId,guestId){
        return likeRepository.deleteLikeRepository(hostId,guestId)
    }
})

module.exports = likeService;