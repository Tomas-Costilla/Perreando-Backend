const deleteUploadFile = require("../../utils/deleteFile")

const petController = ({petService}) =>({
    async createPetController(req,res){
        let {path} = req.file
        try {
            await petService.createPetService(req.body,req.file)
            res.json({message:"Se ha creado la mascota con exito"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        deleteUploadFile(path)
    },
    async getPetByIdController(req,res){
        let {petId} = req.params
        try {
            let result = await petService.getPetByIdService(petId)
            res.json({message:"Informacion de la mascota",result})            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async updatePetByIdController(req,res){
        let {petId} = req.params
        try {
            let result = await petService.updatePetByIdService(petId,req.body)
            res.json({message:"Se ha actualizado la informacion de tu mascota",result})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    async deletePetByIdController(req,res){
        let {petId} = req.params
        try {
            let result = await petService.deletePetByIdService(petId)
            res.json({message: "Se ha eliminado el registro de tu mascota",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async updatePetImageController(req,res){
        let {petId,petImageName} = req.params
        let {path} = req.file
        try {
            let result = await petService.updatePetImageService(petId,petImageName,req.file)
            res.json({message:"Se ha actualizado la imagen de tu mascota",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        deleteUploadFile(path)
        
    },
    async getPetsByOwnerController(req,res){
        let {ownerId} = req.params
        try {
            let result = await petService.getPetsByOwnerService(ownerId)
            res.json({message: "Tus mascotas",result})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})

module.exports = petController;