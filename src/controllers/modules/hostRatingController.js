const hostRatingController = ({hostRatingService})=>({
    async addRatingHost(req,res){
        try {
            await hostRatingService.addRatingHostService(req.body)
            res.json("Se ha agregado la calificacion con exito")
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
    }
})
module.exports = hostRatingController;