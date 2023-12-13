const hostRatingController = ({hostRatingService})=>({
    async addRatingHost(req,res){
        try {
            await hostRatingService.addRatingHostService(req.body)
            res.json({message: "se ha agregado la calificacion con exito"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getRatingsInfo(req,res){
        let {id} = req.params
        try {
            let data = await hostRatingService.getRatingsInfoService(id)
            res.json({message:"Informacion de la calificacion",data})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async checkGuestRatingController(req,res){
        let {hostId,guestId} = req.params
        try {
            let result = await hostRatingService.checkGuestRatingService(hostId,guestId)
            res.json({message:"Informacion de la calificacion",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getRatingByIdController(req,res){
        let {ratingId} = req.params
        try {
            let result = await hostRatingService.getRatingById(ratingId)
            res.json({message:"Informacion de la calificacion",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async updateRatingController(req,res){
        let {ratingId} = req.params
        try {
            let result = await hostRatingService.updateRating(ratingId,req.body)
            res.json({message:"Se ha modificado con exito la calificacion",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async deleteRatingController(req,res){
        let {ratingId} = req.params
        try {
            let result = await hostRatingService.deleteRating(ratingId)
            res.json({message:"Se ha eliminado esta calificacion",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})
module.exports = hostRatingController;