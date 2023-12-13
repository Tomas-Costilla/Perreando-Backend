const baseRepository = require("../baseRepository")
const {bookingModel, hostModel} = require("../../dao/db")
const {CLOUDINARY_IMAGEURL} = require("../../config/globals")
const moment = require("moment");


const bookingRepository = () =>({
    async createBookingRepository(data) {
        let bookingDateFrom = new Date(data.bookingDateStart);
        let bookingDateTo = new Date(data.bookingDateEnd);

          let {hostOwnerCapacity} = await hostModel.findOne({_id: data.bookingHostId})
          let totalGuestHost = await bookingModel.countDocuments({bookingHostId: data.bookingHostId,bookingState: "Reservada"})
          
          if(hostOwnerCapacity === totalGuestHost) throw new Error("La capacidad del anfitrion esta completa")

          let bookingPrevData = await bookingModel.findOne({
            bookingGuestId: data.bookingGuestId,
            bookingDateStart: bookingDateFrom,
            bookingDateEnd: bookingDateTo,
            bookingState:"Reservada"
          });
          if (bookingPrevData) throw new Error("Ya tienes una reserva en las mismas fechas!")
          
          return baseRepository.createData(bookingModel,data)

      },
      async getAllBookingHostRepository(hostId) {
          let dataDb = await bookingModel
            .find({ bookingHostId: hostId,bookingState:"Reservada" })
            .sort({bookingCreatedAt: 1})
            .populate("bookingGuestId", {
              userFullName: 1,
              userEmail: 1,
              userPhone: 1,
              userImageName: 1,
              userGuestAnimalName: 1,
            });
          let newDataArray = dataDb.map((item) => {
            let {bookingDateStart,bookingDateEnd,bookingCreatedAt,...newObject} = item._doc; 
            return {
              ...newObject,
              bookingDateStart: moment(item._doc.bookingDateStart).format("YYYY-MM-DD"),
              bookingDateEnd: moment(item._doc.bookingDateEnd).format("YYYY-MM-DD"),
              bookingCreatedAt: moment(item._doc.bookingCreatedAt).format("YYYY-MM-DD"),
              imageFileUri: `${CLOUDINARY_IMAGEURL}${item.bookingGuestId.userImageName}`
            };
          });
          return newDataArray
      },
      async getAllBookingGuestRepository(guestId) {
          let dataDb = await bookingModel
            .find({ bookingGuestId: guestId })
            .sort({bookingCreatedAt: -1,bookingState: -1})
            .populate("bookingHostId", {
              hostDescription: 1,
              hostPrice: 1,
              hostOwnerId: 1,
            });

          let newDataDb = dataDb.map((item) => {
            return {
              _id: item._doc._id,
              bookingHostId: item._doc.bookingHostId,
              bookingGuestId: item._doc.bookingGuestId,
              bookingDateStart: moment(item._doc.bookingDateStart).add(1,'days').format("YYYY-MM-DD"),
              bookingDateEnd: moment(item._doc.bookingDateEnd).add(1,'days').format("YYYY-MM-DD"),
              bookingState: item._doc.bookingState,
              bookingCreatedAt: moment(item._doc.bookingCreatedAt).format("YYYY-MM-DD")
            };
          });
          return newDataDb
      },
      async endBookingGuestRepository(bookingId) {
          return bookingModel.updateOne(
            { _id: bookingId },
            { bookingState: "Finalizado" }
          );
      },
      async cancelBookingGuestRepository(bookingId) {
          return bookingModel.updateOne(
            { _id: bookingId },
            { bookingState: "Cancelado" }
          );
      }
})

module.exports = bookingRepository;