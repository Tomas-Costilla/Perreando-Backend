const {hostModel} = require("../../dao/db")

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
    async updateHostService(data){
        return hostModel.findByIdAndUpdate(data._id,{
            hostDescription: data.hostDescription,
            hostOwnerCapacity:data.hostOwnerCapacity,
            hostPrice:data.hostPrice
        })
    },
    async deleteHostService(hostId){
        return hostModel.findByIdAndDelete(hostId)
    },
    async checkifHostExistService(ownerId){
        try {
            const dataDB = await hostModel.findOne({hostOwnerId: ownerId})
            if(dataDB) return true
            else return false
        } catch (error) {
            throw new Error("Ocurrio un error en la base de datos")
        }
    }
})

module.exports = hostService;