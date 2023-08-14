const {hostModel,hostRating} = require("../../dao/db")
const {CLOUDINARY_IMAGEURL} = require("../../config/globals")

const hostService = () => ({
    async createHostService(data){
        return hostModel.create(data)
    },
    async addGuestToHostService(hostId,guestId){
        let host = await hostModel.findById({_id: hostId})

        host.hostGuests.push({guestId: guestId})
        
        let result = await hostModel.updateOne({_id: hostId},host)

        return result;
    },
    async getHostInfoService(hostId){
        try {
            let dataDB = await hostModel.findById({_id: hostId})
                                        .populate('hostOwnerId',{
                                            _id:1,
                                            userFullName:1,
                                            userEmail:1,
                                            userPhone:1,
                                            userImageName:1,
                                            userUbication:1,
                                            userAddressStreet:1,
                                            userAddressNumber:1,
                                            userAddressBetwStreet:1,
                                            userAddressExtraInfo:1
                                        })

            let returnData = {...dataDB._doc,ImageUri: `${CLOUDINARY_IMAGEURL}${dataDB._doc.hostOwnerId.userImageName}`}

            return returnData
        } catch (error) {
            return error.message
        }
    },
    async getHostInfobyOwnerService(ownerId){
        return hostModel.findOne({hostOwnerId: ownerId})
    },
    async updateHostService(id,data){
        return hostModel.findByIdAndUpdate(id,data)
    },
    async deleteHostService(hostowId){
        try {
            await hostModel.findOneAndDelete({hostOwnerId: hostowId})
            await hostRating.findOneAndDelete({hostOwnerId: hostowId})
        } catch (error) {
            return error.message
        }
    },
    async checkifHostExistService(ownerId){
        try {
            const dataDB = await hostModel.findOne({hostOwnerId: ownerId})
            if(dataDB) return true
            else return false
        } catch (error) {
            throw new Error("Ocurrio un error en la base de datos")
        }
    },
    async getGuestHostInfo(guestId){
        try {
            const guestData = await hostModel.findOne({"hostGuests.guestId":guestId})
            if(!guestData) return {}
            return guestData
        } catch (error) {
            return error.message
        }
    },
    async deleteGuestFromHost(hostId,guestEmail){
        try {   
            const {hostGuests} = await hostModel.findById(hostId)
            const newDataWithoutGuest = hostGuests.filter(data=>data.guestId.userEmail !== guestEmail)
            const result = await hostModel.updateOne({_id: hostId},{hostGuests: newDataWithoutGuest})

            if(result.modifiedCount===1) return {message:"Eliminado con exito"}
            else return {message: "No se ha encontrado o no ha podido eliminar al huesped"}
        } catch (error) {
            return error.message
        }
    },
    async getAllHostbyUbication(ubication){
        try {
            let results = []
            if(ubication !== "all"){
                results = await hostModel.find({hostLocation: ubication})
                .populate('hostOwnerId',{
                    _id:1,
                    userFullName:1,
                    userEmail:1,
                    userPhone:1,
                    userImageName:1,
                    userUbication:1,
                    userAddressStreet:1,
                    userAddressNumber:1,
                    userAddressBetwStreet:1,
                    userAddressExtraInfo:1
                  })
            }else results = await hostModel.find().populate('hostOwnerId',{
                _id:1,
                userFullName:1,
                userEmail:1,
                userPhone:1,
                userImageName:1,
                userUbication:1,
                userAddressStreet:1,
                userAddressNumber:1,
                userAddressBetwStreet:1,
                userAddressExtraInfo:1
              })
            
            const manipulateData = results.map(item => {
                return {...item._doc,imageUri: `${CLOUDINARY_IMAGEURL}${item.hostOwnerId.userImageName}`}
            })
                
            return manipulateData
        } catch (error) {
            return error.message
        }
    }
})

module.exports = hostService;