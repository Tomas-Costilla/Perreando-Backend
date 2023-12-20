
const bookingService = ({bookingRepository}) => ({
  async createBookingService(data) {
   return bookingRepository.createBookingRepository(data)
  },
  async getAllBookingHostService(hostId) {
    return bookingRepository.getAllBookingHostRepository(hostId)
  },
  async getAllBookingGuestService(guestId) {
   return bookingRepository.getAllBookingGuestRepository(guestId)
  },
  async endBookingGuestService(bookingId) {
    return bookingRepository.endBookingGuestRepository(bookingId)
  },
  async cancelBookingGuestService(bookingId) {
    return bookingRepository.cancelBookingGuestRepository(bookingId)
  },
  async getAllActiveBookingService(guestId){
    return bookingRepository.getAllActiveBookingRepository(guestId)
  }
});

module.exports = bookingService;
