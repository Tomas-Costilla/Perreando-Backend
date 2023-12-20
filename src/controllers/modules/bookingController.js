
const bookingController = ({bookingService}) =>({
    async createBookingController(req,res){
        try {
            await bookingService.createBookingService(req.body)
            res.json({message: "Se ha creado la reserva correctamente"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getAllBookingHostController(req,res){
        let {hostId} = req.params
        try {
            let response = await bookingService.getAllBookingHostService(hostId)
            res.json({message:"Informacion de todas las reservas",response})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getAllBookingGuestController(req,res){
        let {guestId} = req.params
        try {
            let response = await bookingService.getAllBookingGuestService(guestId)
            res.json({message: "Informacion de todas las reservas",response})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async endBookingGuestController(req,res){
        let {bookingId} = req.params
        try {
            let response = await bookingService.endBookingGuestService(bookingId)
            res.json({message: "Se ha finalizado tu reserva",response})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async cancelBookingGuestController(req,res){
        let {bookingId} = req.params
        try {
            let response = await bookingService.cancelBookingGuestService(bookingId)
            res.json({message: "Se ha cancelado tu reserva",response})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    async getAllActiveBookingController(req,res){
        let {guestId} = req.params
        try {
            let response = await bookingService.getAllActiveBookingService(guestId)
            res.json(response)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})

module.exports = bookingController;