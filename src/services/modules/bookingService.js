const { bookingModel, hostModel } = require("../../dao/db/index");
const { CLOUDINARY_IMAGEURL } = require("../../config/globals");
const moment = require("moment");

const bookingService = () => ({
  async createBookingService(data) {
    let bookingDateFrom = new Date(data.bookingDateStart);
    let bookingDateTo = new Date(data.bookingDateEnd);
    try {
      let {hostOwnerCapacity} = await hostModel.findOne({_id: data.bookingHostId})
      let totalGuestHost = await bookingModel.countDocuments({bookingHostId: data.bookingHostId,bookingState: "Reservada"})
      if(hostOwnerCapacity === totalGuestHost){
        return {message: "La capacidad del anfitrion esta completa",result: false}
      }
      let bookingPrevData = await bookingModel.findOne({
        bookingGuestId: data.bookingGuestId,
        bookingDateStart: bookingDateFrom,
        bookingDateEnd: bookingDateTo,
        bookingState:"Reservada"
      });
      if (bookingPrevData)
        return {
          message: "Ya tienes una reserva en las mismas fechas!",
          result: false,
        };
      await bookingModel.create(data);
      return {
        message: "Reserva creada",
        result: true,
      };
    } catch (error) {
      return error.message;
    }
  },
  async getAllBookingHostService(hostId) {
    try {
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
      return {
        message: "Tus huespedes",
        result: newDataArray,
      };
    } catch (error) {
      return error.message;
    }
  },
  async getAllBookingGuestService(guestId) {
    try {
      let dataDb = await bookingModel
        .find({ bookingGuestId: guestId })
        .sort({bookingCreatedAt: -1,bookingState: -1})
        .populate("bookingHostId", {
          hostDescription: 1,
          hostPrice: 1,
          hostOwnerId: 1,
        });

      /*   console.log(dataDb); */

      let newDataDb = dataDb.map((item) => {
       /*  console.log(item); */
    /*   let day = item.bookingDateStart.getDate()+1
      console.log(day);  */

     /*  let dateStart = moment(item._doc.bookingDateStart).add(1,'days').format("YYYY-MM-DD") */
     /* console.log(moment(item._doc.bookingDateStart).add(1,'days').format("YYYY-MM-DD")); */

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
      return { message: "Tus reservas", result: newDataDb };
    } catch (error) {
      return error.message;
    }
  },
  async endBookingGuestService(bookingId) {
    try {
      await bookingModel.updateOne(
        { _id: bookingId },
        { bookingState: "Finalizado" }
      );
      return { message: "Se ha finalizado tu reserva", result: true };
    } catch (error) {
      return error.message;
    }
  },
  async cancelBookingGuestService(bookingId) {
    try {
      await bookingModel.updateOne(
        { _id: bookingId },
        { bookingState: "Cancelado" }
      );
      return { message: "Se ha cancelado tu reserva", result: true };
    } catch (error) {
      return error.message;
    }
  },
});

module.exports = bookingService;
