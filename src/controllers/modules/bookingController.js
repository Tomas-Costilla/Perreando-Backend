
const bookingController = ({bookingService}) =>({
    async createBookingController(req,res){
        /* console.log(req.body) */
        try {
            let response = await bookingService.createBookingService(req.body)
            res.json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async getAllBookingHostController(req,res){
        let {hostId} = req.params
        try {
            let response = await bookingService.getAllBookingHostService(hostId)
            res.json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async getAllBookingGuestController(req,res){
        let {guestId} = req.params
        try {
            let response = await bookingService.getAllBookingGuestService(guestId)
            res.json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async endBookingGuestController(req,res){
        let {bookingId} = req.params
        try {
            let response = await bookingService.endBookingGuestService(bookingId)
            res.json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async cancelBookingGuestController(req,res){
        let {bookingId} = req.params
        try {
            let response = await bookingService.cancelBookingGuestService(bookingId)
            res.json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
})

module.exports = bookingController;