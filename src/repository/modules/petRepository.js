const { CLOUDINARY_IMAGEURL } = require("../../config/globals")
const {petModel, userModel} = require("../../dao/db")
const { uploadImage, updateImage, deleteImage } = require("../../utils/cloudinary")
const baseRepository = require("../baseRepository")


const petRepository = () =>({
    async createPetRepository(petData,petImage){
        let newPetObject = {...petData,petImageName: petImage.filename}
        /* Upload image to Storage */
        await uploadImage(petImage.path)
        return baseRepository.createData(petModel,newPetObject)
    },
    async getPetByIdRepository(petId){
        return petModel.findById(petId)
    },
    async updatePetByIdRepository(petId,dataToUpdate){
        return petModel.findByIdAndUpdate({_id: petId},dataToUpdate)
    },
    async deletePetByIdRepository(petId){
        let petDB = await petModel.findById({_id: petId})
        await deleteImage(petDB.petImageName)
        return petModel.deleteOne({_id: petId})
    },
    async updatePetImageRepository(petId,oldPetImage,newPetImage){
        await updateImage(oldPetImage,newPetImage.path)
        await petModel.updateOne({_id: petId},{petImageName: newPetImage.filename})
        return `${CLOUDINARY_IMAGEURL}${newPetImage.filename}.webp`
    },
    async getPetsByOwnerRepository(ownerId){
        let petsDB = await petModel.find({petOwnerId: ownerId})
        let newPetsDataWithImageUrl = petsDB.map(petItem => {
            return {
                ...petItem._doc,
                petImageUrl: `${CLOUDINARY_IMAGEURL}${petItem.petImageName}.webp`
            }
        })
        return {
            newPetsDataWithImageUrl,
            totalPets: newPetsDataWithImageUrl.length
        }; 
    }
})

module.exports = petRepository;