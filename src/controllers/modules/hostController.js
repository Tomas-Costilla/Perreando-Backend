const fs = require('fs')
const deleteUploadFile = require("../../utils/deleteFile")

const hostController = ({hostService}) => ({
    async createHost(req,res){
        try {
            await hostService.createHostService(req.body,req.files)
            res.json({message: "Se ha creado con exito el hospedaje"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }

        req.files.forEach((image,index) => {
            deleteUploadFile(image.path)
        });
    },
    async addGuestToHost(req,res){
        try {
            let result = await hostService.addGuestToHostService(req.body)
            res.json({message:"Se añadio el huesped al anfitrion",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getHostInfo(req,res){
        let {id} = req.params
        try {
            let result = await hostService.getHostInfoService(id)
            res.json({message:"Informacion del hospedaje",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getHostInfobyOwner(req,res){
        let {id} = req.params
        try {
            let data = await hostService.getHostInfobyOwnerService(id)
            res.json({message:"Informacion de tu hospedaje",data})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async updateHost(req,res){
        const {id} = req.params
        try {
            await hostService.updateHostService(id,req.body)
            res.json({message: "Se ha modificado con exito el hospedaje"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async deleteHost(req,res){
        let {id} = req.params
        try {
            await hostService.deleteHostService(id)
            res.json({message: "Se ha eliminado con exito el hospedaje"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async checkExistHostController(req,res){
        let {ownerId} = req.params
        try {
            const result = await hostService.checkifHostExistService(ownerId)
            res.json({message: "Resultado de la operacion",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getGuestHostController(req,res){
        let {guestId} = req.params
        try {
            const result = await hostService.getGuestHostInfo(guestId)
            res.json({message:"Informacion del huesped",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async deleteGuestFromHostController(req,res){
        let {hostId,guestId} = req.params
        try {
            const result = await hostService.deleteGuestFromHost(hostId,guestId)
            res.json({message:"Se elimino el huesped del hospedaje",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getInfobyUbicationController(req,res){
        let {ubiName} = req.query
        let ubication = ubiName ? ubiName : "all"
        try {
            const result = await hostService.getAllHostbyUbication(ubication)
            res.json({message: "Hospedajes segun ubicacion",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },async checkIfGuestReserveController(req,res){
        let {guestId} = req.params
        try {
            const result = await hostService.checkIfGuestReserve(guestId)
            res.json({message: "Verificacion si existe reserva",existe: result})
        } catch (error) {
            res.status(500).json({message: error.message})
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
            res.json({message: "Se finalizo tu hospedaje",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async deleteHostImageController(req,res){
        let {hostId,imageName} = req.params
        try {
            let result = await hostService.deleteHostImage(hostId,imageName)
            res.json({message: "Se elimino la imagen de tu hospedaje",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async addImageHostController(req,res){
        let {hostId} = req.params
        let {path} = req.file
        try {
            let result = await hostService.addImageHost(hostId,req.file)
            res.json({message:"Se añadio la imagen a tu hospedaje",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        deleteUploadFile(path)
    }
})

module.exports = hostController;