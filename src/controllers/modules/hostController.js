const fs = require('fs')

const hostController = ({hostService}) => ({
    async createHost(req,res){
        console.log(req.body)
        try {
            await hostService.createHostService(req.body,req.files)
            res.json("Host creado con exito")
        } catch (error) {
            res.json(error.message)
        }
        /* fs.access(path,error=>{
            if(!error) fs.unlinkSync(path)
            else console.log("ocurrio un error al querer eliminarlo");
        }) */
        req.files.forEach((image,index) => {
            fs.access(image.path,error=>{
                if(!error) fs.unlinkSync(image.path)
                else console.log("ocurrio un error al querer eliminarlo");
            })
        });
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
        let {ubiName} = req.query
       
        let ubication = ubiName ? ubiName : "all"
      /*   let ubiName = ubication ? ubication : "all" */
        try {
            const result = await hostService.getAllHostbyUbication(ubication)
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
    },
    async EndBookingHostController(req,res){
        let {hostId} = req.params
        let {idBooking,newBookingState} = req.body
        try {
            let result = await hostService.EndBookingHostService(hostId,idBooking,newBookingState)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async deleteHostImageController(req,res){
        let {hostId,imageName} = req.params
        try {
            let result = await hostService.deleteHostImage(hostId,imageName)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async addImageHostController(req,res){
        let {hostId} = req.params
        let {path} = req.file
        try {
            let result = await hostService.addImageHost(hostId,req.file)
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }

        fs.access(path,error=>{
            if(!error) fs.unlinkSync(path)
            else console.log("ocurrio un error al querer eliminarlo");
        })
    }
})

module.exports = hostController;