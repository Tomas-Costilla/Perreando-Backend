const notificationService = ({notificationRepository}) => ({
    async getCountNotificationService(userId){
        return notificationRepository.getCountNotificationRepository(userId)
    }
})

module.exports = notificationService;