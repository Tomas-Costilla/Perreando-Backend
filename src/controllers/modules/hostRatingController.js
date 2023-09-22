const hostRatingController = ({hostRatingService})=>({
    async addRatingHost(req,res){
        try {
            await hostRatingService.addRatingHostService(req.body)
            res.json({message: "se ha agregado la calificacion con exito"})
        } catch (error) {
            res.json(error.message)   
        }
    },
    async getRatingsInfo(req,res){
        let {id} = req.params
        try {
            let data = await hostRatingService.getRatingsInfoService(id)
            res.json(data)
        } catch (error) {
            res.json(error.message)
        }
    },
    async checkGuestRatingController(req,res){
        let {hostId,guestId} = req.params
        try {
            let result = await hostRatingService.checkGuestRatingService(hostId,guestId)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async getRatingByIdController(req,res){
        let {ratingId} = req.params
        try {
            let result = await hostRatingService.getRatingById(ratingId)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async updateRatingController(req,res){
        let {ratingId} = req.params
        try {
            let result = await hostRatingService.updateRating(ratingId,req.body)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async deleteRatingController(req,res){
        let {ratingId} = req.params
        try {
            let result = await hostRatingService.deleteRating(ratingId)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
})
module.exports = hostRatingController;