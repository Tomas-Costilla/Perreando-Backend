const trayController = ({trayService}) =>({
    async createTrayController(req,res){
        try {
            await trayService.createTrayService(req.body)
            res.json({message: "Se creo el registro en la bandeja"})
        } catch (error) {
            res.status(500).json({message: error.message})            
        }
    },
    async getAllTrayController(req,res){
        let {trayOwnerId} = req.params
        try {
            let result = await trayService.getAllTrayService(trayOwnerId)
            res.json(result)
        } catch (error) {
            res.status(500).json({message: error.message})            
        }
    },
    async rejectGuestReserveController(req,res){
        let {trayId} = req.params
        try {
            await trayService.rejectGuestReserveService(trayId,req.body)
            res.json({message: "Se rechazo la solicitud"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async confirmGuestReserveController(req,res){
        let {trayId} = req.params
        try {
            await trayService.confirmGuestReserveService(trayId,req.body)
            res.json({message: "Se confirmo la soliitud"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})

module.exports = trayController;