const {hostModel,hostRating} = require("../../dao/db")

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
        return hostModel.findOne({_id: hostId})
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
    }
})

module.exports = hostService;