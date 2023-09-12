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
       /*  let {hostId,guestId} = req.body */
        try {
            let result = await hostService.addGuestToHostService(req.body)
            res.json({message:"Se añadio el huesped al anfitrion",result})
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
        const {id} = req.params
        try {
            await hostService.updateHostService(id,req.body)
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
    },
    async getGuestHostController(req,res){
        let {guestId} = req.params
        try {
            const result = await hostService.getGuestHostInfo(guestId)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async deleteGuestFromHostController(req,res){
        let {hostId,guestId} = req.params
        try {
            const result = await hostService.deleteGuestFromHost(hostId,guestId)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async getInfobyUbicationController(req,res){
        let {ubication} = req.query
        let ubiName = ubication ? ubication : "all"
        try {
            const result = await hostService.getAllHostbyUbication(ubiName)
            res.json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },async checkIfGuestReserveController(req,res){
        let {guestId} = req.params
       /*  console.log(req.body) */
        try {
            const result = await hostService.checkIfGuestReserve(guestId)
            res.json({message: "Resultado",existe: result})
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async getHostGuestsController(req,res){
        let {hostId} = req.params
        try {
            let result = await hostService.getHostGuests(hostId)
            res.json({message: "Tus huespedes",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})

module.exports = hostController;