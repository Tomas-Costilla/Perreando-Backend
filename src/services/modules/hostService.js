
const hostService = ({hostRepository}) => ({
  async createHostService(data,files) {
   return hostRepository.createHostData(data/* ,files */)
  },
  async addGuestToHostService(data) {
    return hostRepository.addGuestToHostRepository(data)
  },
  async getHostInfoService(hostId) {
   return hostRepository.getHostInfoRepository(hostId)
  },
  async getHostInfobyOwnerService(ownerId) {
    return hostRepository.getHostInfobyOwnerRepository(ownerId)
  },
  async updateHostService(hostId, dataToUpdate) {
    return hostRepository.updateHostRepository(hostId,dataToUpdate)
  },
  async deleteHostService(hostowId) {
    return hostRepository.deleteHostRepository(hostowId)
  },
  async checkifHostExistService(ownerId) {
   return hostRepository.checkifHostExistRepository(ownerId)
  },
  async getGuestHostInfo(guestId) {
   return hostRepository.getGuestHostRepository(guestId)
  },
  async deleteGuestFromHost(hostId, guestId) {
    return hostRepository.deleteGuestFromHostRepository(hostId,guestId)
  },
  async getAllHostbyUbication(ubication) {
    return hostRepository.getAllHostbyUbicationRepository(ubication)
  },
  async checkIfGuestReserve(guestId) {
    return hostRepository.checkIfGuestReserveRepository(guestId)
  },
  async getHostGuests(hostId) {
    return hostRepository.getHostGuestsRepository(hostId)
  },
  async EndBookingHostService(idHost, documentID, newState) {
   return hostRepository.EndBookingHostRepository(idHost, documentID, newState)
  },
  async getCountOfGuestByHost(hostId){
    return hostRepository.getCountOfGuestByHostRepository(hostId)
  },
  async deleteHostImage(hostId,imageName){
    return hostRepository.deleteHostImageRepository(hostId,imageName)
  },
  async addImageHost(hostId,image){
    return hostRepository.addImageHostRepository(hostId,image)
  }
});

module.exports = hostService;
