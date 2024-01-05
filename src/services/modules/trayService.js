const trayService = ({trayRepository}) => ({
    async createTrayService(trayData){
        return trayRepository.createTrayRepository(trayData)
    },
    async getAllTrayService(trayOwnerId){
        return trayRepository.getAllTrayRepository(trayOwnerId)
    },
    async rejectGuestReserveService(trayId,data){
        return trayRepository.rejectGuestReserveRepository(trayId,data)
    },
    async confirmGuestReserveService(trayId,data){
        return trayRepository.confirmGuestReserveRepository(trayId,data)
    }
})

module.exports = trayService;