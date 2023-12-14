const petService = ({petRepository}) =>({
    async createPetService(petData,petImage){
        return petRepository.createPetRepository(petData,petImage)
    },
    async getPetByIdService(petId){
        return petRepository.getPetByIdRepository(petId)
    },
    async updatePetByIdService(petId,dataToUpdate){
        return petRepository.updatePetByIdRepository(petId,dataToUpdate)
    },
    async deletePetByIdService(petId){
        return petRepository.deletePetByIdRepository(petId)
    },
    async updatePetImageService(petId,oldPetImage,newPetImage){
        return petRepository.updatePetImageRepository(petId,oldPetImage,newPetImage)
    },
    async getPetsByOwnerService(ownerId){
        return petRepository.getPetsByOwnerRepository(ownerId)
    }
})

module.exports = petService;