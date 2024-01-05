const notificationModel = require("../../dao/db/models/notificationModel");

const notificationRepository = () => ({
    async getCountNotificationRepository(userId){
        return notificationModel.countDocuments({notificationUserId: userId})
    }
})

module.exports = notificationRepository;