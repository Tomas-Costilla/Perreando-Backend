const {
  hostModel,
  hostRating,
  userModel,
  bookingModel,
} = require("../../dao/db");
const { CLOUDINARY_IMAGEURL } = require("../../config/globals");
const { default: mongoose } = require("mongoose");
const moment = require("moment");
const { uploadImage, deleteImage } = require("../../utils/cloudinary");
const baseRepository = require("../baseRepository");

const hostRepository = () => ({
  async createHostData(data/* , files */) {
    /* let arrayImageNames = files.map((item) => {
      return { hostImageName: item.filename };
    }); */

    let objectToBD = {
      ...data,
      /* hostImages: arrayImageNames, */
    };

    /* uploads images */
   /*  for (const image of files) {
      await uploadImage(image.path);
    } */
    return hostModel.create(objectToBD);
  },
  async addGuestToHostRepository(guestData) {
    let { hostId, guestId } = guestData;
    let host = await hostModel.findById({ _id: hostId });

    let result = await hostModel.updateOne({ _id: hostId }, host);
    if (result.modifiedCount > 0) return;
    else throw new Error("No se pudo agregar el huesped al anfitrion");
  },
  async getHostInfoRepository(hostId) {
    let totalActiveGuest = await bookingModel.countDocuments({
      bookingHostId: hostId,
      bookingState: "Reservada",
    });
    let dataDB = await hostModel
      .findById({ _id: hostId })
      .populate("hostOwnerId", {
        _id: 1,
        userFullName: 1,
        userEmail: 1,
        userPhone: 1,
        userImageName: 1
      });

    let returnData = {
      ...dataDB._doc,
      ImageUri: `${CLOUDINARY_IMAGEURL}${dataDB._doc.hostOwnerId.userImageName}`,
      hostImages: dataDB._doc.hostImages.map((field, index) => {
        return { ImageUri: `${CLOUDINARY_IMAGEURL}${field.hostImageName}` };
      }),
      totalActiveGuest: totalActiveGuest,
    };

    return returnData;
  },
  async getHostInfobyOwnerRepository(ownerId) {
    let dataRetorned = await hostModel.findOne({ hostOwnerId: ownerId });
    if (!dataRetorned) throw new Error("El hospedaje no existe");
    return {
      ...dataRetorned._doc,
      hostImages: dataRetorned.hostImages.map((item) => {
        return {
          ImageName: item.hostImageName,
          ImageUri: `${CLOUDINARY_IMAGEURL}${item.hostImageName}`,
        };
      }),
    };
  },
  async updateHostRepository(hostId, dataToUpdate) {
    return baseRepository.updateDataById(hostModel,hostId,dataToUpdate)
  },
  async deleteHostRepository(hostowId) {
      let userIdHost = await hostModel.findOne({hostOwnerId: hostowId})
      await bookingModel.updateMany({bookingHostId: userIdHost._id},{bookingState: "Cancelado"})
      await hostRating.findOneAndDelete({ hostOwnerId: hostowId }); 
      await hostModel.findOneAndDelete({ hostOwnerId: hostowId });
      return 
  },
  async checkifHostExistRepository(ownerId) {
      const dataDB = await hostModel.findOne({ hostOwnerId: ownerId });
      if (dataDB) return dataDB;
      else throw new Error("No existe el hospedaje");
  },
  async getGuestHostRepository(guestId) {
      let guestDB = await userModel.findById(guestId);
      const guestData = await hostModel.findOne({
        "hostGuests.guestId": guestId,
      });
      if (!guestData) throw new Error("No existe la informacion solicitada");

      let userGuestData = guestData.hostGuests.find(
        (item) => item.guestId.userEmail === guestDB.userEmail
      );
      let dateFrom = moment(userGuestData.hostReserveDateFrom).format(
        "YYYY-MM-DD"
      );
      let dateTo = moment(userGuestData.hostReserveDateTo).format("YYYY-MM-DD");
      return {
        _id: guestData._id,
        hostOwnerId: guestData.hostOwnerId,
        hostDescription: guestData.hostDescription,
        hostPrice: guestData.hostPrice,
        hostReserveDateFrom: dateFrom,
        hostReserveDateTo: dateTo,
        hostReserveEstate: userGuestData.hostReserveEstate,
      };
  },
  async deleteGuestFromHostRepository(hostId, guestId) {
      let objectId = new mongoose.Types.ObjectId(guestId);
      let result = await hostModel.updateOne(
        { _id: hostId },
        {
          $pull: { hostGuests: { guestId: objectId } },
        }
      );
      return result;
  },
  async getAllHostbyUbicationRepository(ubication) {
      let results = [];
      if (ubication !== "all") {
        results = await hostModel
          .find({ hostLocation: ubication })
          .populate("hostOwnerId", {
            _id: 1,
            userFullName: 1,
            userEmail: 1,
            userPhone: 1,
            userImageName: 1,
            userUbication: 1,
            userAddressStreet: 1,
            userAddressNumber: 1,
            userAddressBetwStreet: 1,
            userAddressExtraInfo: 1,
          });
      } else
        results = await hostModel.find().populate("hostOwnerId", {
          _id: 1,
          userFullName: 1,
          userEmail: 1,
          userPhone: 1,
          userImageName: 1,
          userUbication: 1,
          userAddressStreet: 1,
          userAddressNumber: 1,
          userAddressBetwStreet: 1,
          userAddressExtraInfo: 1,
        });

      if(!results){
        return {result: []}
      }

      let dataWithRatingAndActiveGuests = []
      for(const item of results){
        /* console.log(item._doc._id) */
          let activeGuests = await bookingModel.find({bookingHostId: item._doc._id,bookingState:"Reservada"})
          let ratings = await hostRating.find({hostOwnerId: item._doc._id})
          /* console.log(ratings) */
          let averageRating = 0
          if(ratings.length) averageRating = ratings.reduce((acc,val) => acc + val.hostGuestRating,0) / ratings.length
          

          dataWithRatingAndActiveGuests.push({
            ...item._doc,
            imageUri: `${CLOUDINARY_IMAGEURL}${item.hostOwnerId.userImageName}`,
            hostImages: item._doc.hostImages.map((field,index) => { return {ImageUri: `${CLOUDINARY_IMAGEURL}${field.hostImageName}`}}),
            averageRating: averageRating,
            activeGuests: activeGuests.length
          }) 
      }
      return dataWithRatingAndActiveGuests;
  },
  async checkIfGuestReserveRepository(guestId) {
    let guestReserve = await hostModel.find({
        "hostGuests.guestId": guestId,
      });
      if (guestReserve.length===0) throw new Error("El usuario no tiene una reserva activa")

      return  
  },
  async getHostGuestsRepository(hostId) {
    let hostData = await hostModel.findById({ _id: hostId });
    let guestArray = hostData.hostGuests.filter(
      (item) =>
        item.hostReserveEstate === "Reservado" ||
        item.hostReserveEstate === "Finalizado"
    );
    let newHostData = guestArray.map((item) => {
      let dateFrom = moment(item.hostReserveDateFrom).format("YYYY-MM-DD");
      let dateTo = moment(item.hostReserveDateTo).format("YYYY-MM-DD");
      return {
        _id: item.guestId._id,
        userFullName: item.guestId.userFullName,
        userEmail: item.guestId.userEmail,
        userPhone: item.guestId.userPhone,
        userImageUri: `${CLOUDINARY_IMAGEURL}${item.guestId.userImageName}`,
        userGuestAnimalAge: item.guestId.userGuestAnimalName,
        hostReserveDateFrom: dateFrom,
        hostReserveDateTo: dateTo,
        hostReserveEstate: item.hostReserveEstate,
      };
    });
    return newHostData;
  },
  async EndBookingHostRepository(idHost, documentID, newState) {
      let response = await hostModel.updateOne(
        { _id: idHost, "hostGuests._id": documentID },
        {
          $set: { "hostGuests.$.hostReserveEstate": newState },
        }
      );
       return response
  },
  async getCountOfGuestByHostRepository(hostId){
      return bookingModel.countDocuments({bookingHostId: hostId})
  },
  async returnDataWithImage(hostId){
      let dataDB = await hostModel.findById(hostId)
      let newImages = dataDB.hostImages.map(item => {return {ImageName: item.hostImageName,ImageUri: `${CLOUDINARY_IMAGEURL}${item.hostImageName}`}} )
      return newImages
  },
  async deleteHostImageRepository(hostId,imageName){
      await deleteImage(imageName)
      await hostModel.findByIdAndUpdate(hostId,{$pull:{hostImages: {hostImageName: imageName}}})
      return this.returnDataWithImage(hostId)
  },
  async addImageHostRepository(hostId,image){
    await uploadImage(image.path)
    await hostModel.findByIdAndUpdate(hostId,{$push:{hostImages: {hostImageName: image.filename}}})
    return this.returnDataWithImage(hostId)
  }
});

module.exports = hostRepository;
