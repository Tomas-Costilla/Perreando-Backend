const notificationController = ({notificationService}) => ({
    async getCountNotificationController(req,res){
        let {userId} = req.params
        try {
            let response = await notificationService.getCountNotificationService(userId)
            res.json({notificationsTotal: response})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})

module.exports = notificationController;