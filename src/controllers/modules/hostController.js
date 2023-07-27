const hostController = ({hostService}) => ({
    async createHost(req,res){
        try {
            await hostService.createHostService(req.body)
            res.json("Host creado con exito")
        } catch (error) {
            res.json(error.message)
        }
    },
    async addGuestToHost(req,res){
        let {hostId,guestId} = req.body
        try {
            let result = await hostService.addGuestToHostService(hostId,guestId)
            res.json(result)
        } catch (error) {
            res.json(error.message)
        }
    },
    async getHostInfo(req,res){
        let {id} = req.params
        try {
            let result = await hostService.getHostInfoService(id)
            res.json(result)
        } catch (error) {
            res.json(error.message)
        }
    },
    async getHostInfobyOwner(req,res){
        let {id} = req.params
        try {
            let data = await hostService.getHostInfobyOwnerService(id)
            res.json(data)
        } catch (error) {
            res.json(error.message)
        }
    },
    async updateHost(req,res){
        try {
            await hostService.updateHostService(req.body)
            res.json("Se ha modificado con exito")
        } catch (error) {
            res.json(error.message)
        }
    },
    async deleteHost(req,res){
        let {id} = req.params
        try {
            await hostService.deleteHostService(id)
            res.json("Se ha eliminado con exito")
        } catch (error) {
            res.json(error.message)
        }
    },
    async checkExistHostController(req,res){
        let {ownerId} = req.params
        try {
            const idExist = await hostService.checkifHostExistService(ownerId)
            res.json({message: "Resultado de la operacion",result: idExist})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})

module.exports = hostController;