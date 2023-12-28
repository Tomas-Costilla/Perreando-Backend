
const likeController = ({likeService}) =>({
    async addLikeController(req,res){
        try {
            await likeService.addLikeService(req.body)
            res.json({message: "Se creo el like correctamente"})
        } catch (error) {
            res.status(500).json({message: error.message})   
        }
    },
    async checkLikeController(req,res){
        let {hostId,guestId} = req.params
        try {
            let result = await likeService.checkLikeService(hostId,guestId)
            res.json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getAllLikesController(req,res){
        let {guestId} = req.params
        try {
            let result = await likeService.getAllLikesService(guestId)
            res.json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async deleteLikeController(req,res){
        let {hostId,guestId} = req.params
        try {
            await likeService.deleteLikeService(hostId,guestId)
            res.json({message: "Se ha eliminado tu like"})
        } catch (error) {
            res.status(500).json({message: error.message})            
        }
    }
})

module.exports = likeController;