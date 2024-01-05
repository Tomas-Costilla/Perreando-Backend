const baseRepository = require("../baseRepository");
const {
  trayModel,
  userModel,
  petModel,
  bookingModel,
  notificationModel,
} = require("../../dao/db");
const moment = require("moment");
const { CLOUDINARY_IMAGEURL } = require("../../config/globals");
const sendEmail = require("../../utils/email");

const trayRepository = () => ({
  async createTrayRepository(trayData) {
    return baseRepository.createData(trayModel, trayData);
  },
  async getAllTrayRepository(trayOwnerId) {
    let trayDB = await trayModel
      .find({ trayOwnerId: trayOwnerId, trayStatus: "Pendiente" })
      .populate("trayBookingId", {
        bookingGuestId: 1,
        bookingDateStart: 1,
        bookingDateEnd: 1,
        bookingTotal: 1,
        bookingPetId: 1,
        bookingCreatedAt: 1,
      })
      .then(async (docs) => {
        let manipulateData = [];
        for (const item of docs) {
          let bookingMomentStart = moment(item.trayBookingId?.bookingDateStart)
            .add(1, "days")
            .format("YYYY-MM-DD");
          let bookingMomentEnd = moment(item.trayBookingId?.bookingDateEnd)
            .add(1, "days")
            .format("YYYY-MM-DD");
          let bookingMomentCreated = moment(
            item.trayBookingId?.bookingCreatedAt
          ).format("YYYY-MM-DD");
          let userGuestData = await userModel.findById({
            _id: item.trayBookingId?.bookingGuestId,
          });
          let petGuestData = await petModel.findById({
            _id: item.trayBookingId?.bookingPetId,
          });
          manipulateData.push({
            _id: item._id,
            trayBookingId: item.trayBookingId?._id,
            bookingMomentStart,
            bookingMomentEnd,
            guestUserId: userGuestData._id,
            guestUserEmail: userGuestData.userEmail,
            guestFullName: userGuestData.userFullName,
            guestImageUrl: `${CLOUDINARY_IMAGEURL}${userGuestData.userImageName}`,
            guestPetName: petGuestData.petName,
            guestPetAge: petGuestData.petAge,
            guestPetWeight: petGuestData.petWeight,
            guestPetImageUrl: `${CLOUDINARY_IMAGEURL}${petGuestData.petImageName}`,
            bookingTotal: item.trayBookingId?.bookingTotal,
            bookingMomentCreated,
            trayStatus: item.trayStatus,
          });
        }
        return manipulateData;
      });

    if (!trayDB.length) return [];

    return trayDB;
  },
  async rejectGuestReserveRepository(trayId, data) {
    let { bookingId, hostId, hostEmail, guestId, guestEmail } = data;
    let userDB = await userModel.findById({ _id: hostId });
    await trayModel.updateOne({ _id: trayId }, { trayStatus: "Rechazada" });
    await bookingModel.updateOne(
      { _id: bookingId },
      { bookingState: "Rechazada" }
    );
   
    await notificationModel.create({
      notificationUserId: guestId,
      notificationMessage: `${userDB.userFullName} rechazo tu solicitud de reserva`,
    });

    /* send email to guest */
    return sendEmail({
      addressee: guestEmail,
      subjectEmail: "Han rechazado tu solicitud de Reserva",
      textEmail: `${userDB.userFullName} rechazo tu solicitud de reserva`,
    });
  },
  async confirmGuestReserveRepository(trayId, data) {
    let { bookingId, hostId, hostEmail, guestId, guestEmail } = data;
    let userDB = await userModel.findById({ _id: hostId });
    await trayModel.updateOne({ _id: trayId }, { trayStatus: "Confirmada" });
    await bookingModel.updateOne(
      { _id: bookingId },
      { bookingState: "Confirmada" }
    );
    
    await notificationModel.create({
      notificationUserId: guestId,
      notificationMessage: `${userDB.userFullName} confirmo tu solicitud de reserva`,
    });
     /* send email to guest */
     return sendEmail({
        addressee: guestEmail,
        subjectEmail: "Han Confirmado tu solicitud de Reserva",
        textEmail: `${userDB.userFullName} confirmo tu solicitud de reserva`,
      });
  },
});

module.exports = trayRepository;
