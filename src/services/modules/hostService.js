const { hostModel, hostRating, userModel, bookingModel } = require("../../dao/db");
const { CLOUDINARY_IMAGEURL } = require("../../config/globals");
const { default: mongoose } = require("mongoose");
const moment = require("moment");
const { uploadImage } = require("../../utils/cloudinary");

const hostService = () => ({
  async createHostService(data,files) {
    let arrayImageNames = files.map(item=>{
      return {hostImageName: item.filename}
    })
    let objectToBD = {
      hostOwnerId: data.hostOwnerId,
      hostDescription: data.hostDescription,
      hostLocation:data.hostLocation,
      hostOwnerCapacity:data.hostOwnerCapacity,
      hostPrice:data.hostPrice,
      hostTypeAnimals:data.hostTypeAnimals,
      hostAnimalWeightFrom:data.hostAnimalWeightFrom,
      hostAnimalWeightTo:data.hostAnimalWeightTo,
      hostAnimalAgeFrom:data.hostAnimalAgeFrom,
      hostAnimalAgeTo:data.hostAnimalAgeTo,
      hostImages: arrayImageNames
    }
    try {
        /* uploads images */
        for (const image of files) {
          await uploadImage(image.path)
        }
        return hostModel.create(objectToBD) 
    } catch (error) {
      return error.message
    }

  },
  async addGuestToHostService(data) {
    let {
      hostId,
      guestId,
      hostReserveDateFrom,
      hostReserveDateTo,
      hostReserveEstate,
    } = data;
    let host = await hostModel.findById({ _id: hostId });

    /* console.log(host.hostGuests) */
    let objectId = new mongoose.Types.ObjectId(guestId);
    
    let arrayWithUserHost = host.hostGuests.find(element=> element.guestId === guestId)
    
    let result = await hostModel.updateOne({ _id: hostId }, host);
    if (result.modifiedCount > 0) return true;
    else return false;
  },
  async getHostInfoService(hostId) {
    try {
      let totalActiveGuest = await bookingModel.countDocuments({bookingHostId: hostId,bookingState: "Reservada"})
      let dataDB = await hostModel
        .findById({ _id: hostId })
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

      let returnData = {
        ...dataDB._doc,
        ImageUri: `${CLOUDINARY_IMAGEURL}${dataDB._doc.hostOwnerId.userImageName}`,
        hostImages: dataDB._doc.hostImages.map((field,index) => { return {ImageUri: `${CLOUDINARY_IMAGEURL}${field.hostImageName}`}}),
        totalActiveGuest: totalActiveGuest
      };

      return returnData;
    } catch (error) {
      return error.message;
    }
  },
  async getHostInfobyOwnerService(ownerId) {
    return hostModel.findOne({ hostOwnerId: ownerId });
  },
  async updateHostService(id, data) {
    return hostModel.findByIdAndUpdate(id, data);
  },
  async deleteHostService(hostowId) {
    try {
      let userIdHost = await hostModel.findOne({hostOwnerId: hostowId})
      await bookingModel.updateMany({bookingHostId: userIdHost._id},{bookingState: "Cancelado"})
      await hostRating.findOneAndDelete({ hostOwnerId: hostowId }); 
      await hostModel.findOneAndDelete({ hostOwnerId: hostowId });
    } catch (error) {
      return error.message;
    }
  },
  async checkifHostExistService(ownerId) {
    try {
      const dataDB = await hostModel.findOne({ hostOwnerId: ownerId });
      if (dataDB) return true;
      else return false;
    } catch (error) {
      throw new Error("Ocurrio un error en la base de datos");
    }
  },
  async getGuestHostInfo(guestId) {
    try {
      let guestDB = await userModel.findById(guestId);
      const guestData = await hostModel.findOne({
        "hostGuests.guestId": guestId,
      });
      if (!guestData) return {};

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
    } catch (error) {
      return error.message;
    }
  },
  async deleteGuestFromHost(hostId, guestId) {
    try {
      let objectId = new mongoose.Types.ObjectId(guestId);
      let result = await hostModel.updateOne(
        { _id: hostId },
        {
          $pull: { hostGuests: { guestId: objectId } },
        }
      );
      return result;
    } catch (error) {
      return error.message;
    }
  },
  async getAllHostbyUbication(ubication) {
    try {
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

      let manipulateData = []
      for(const item of results){
        /* console.log(item._doc._id) */
          let activeGuests = await bookingModel.find({bookingHostId: item._doc._id,bookingState:"Reservada"})
          let ratings = await hostRating.find({hostOwnerId: item._doc._id})
          /* console.log(ratings) */
          let averageRating = 0
          if(ratings.length) averageRating = ratings.reduce((acc,val) => acc + val.hostGuestRating,0) / ratings.length
          

          manipulateData.push({
            ...item._doc,
            imageUri: `${CLOUDINARY_IMAGEURL}${item.hostOwnerId.userImageName}`,
            hostImages: item._doc.hostImages.map((field,index) => { return {ImageUri: `${CLOUDINARY_IMAGEURL}${field.hostImageName}`}}),
            averageRating: averageRating,
            activeGuests: activeGuests.length
          }) 
      }

      return manipulateData;
    } catch (error) {
      return error.message;
    }
  },
  async checkIfGuestReserve(guestId) {
    try {
      /* let {hostGuests} = await hostModel.findById(hostId)
            return hostGuests.some(item=>item.guestId.userEmail === userEmail)    */
      let guestReserve = await hostModel.find({
        "hostGuests.guestId": guestId,
      });
      if (guestReserve.length) return true;
      else return false;
    } catch (error) {
      return error;
    }
  },
  async getHostGuests(hostId) {
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
  async EndBookingHostService(idHost, documentID, newState) {
    /* console.log(`${idHost} ${documentID} ${newState}`) */
    try {
      let response = await hostModel.updateOne(
        { _id: idHost, "hostGuests._id": documentID },
        {
          $set: { "hostGuests.$.hostReserveEstate": newState },
        }
      );
      return {
        response,
        message: "Tu reserva se ha finalizado correctamente",
      };
    } catch (error) {
      return error.message;
    }
  },
  async getCountOfGuestByHost(hostId){
    try {
      let totalGuest = await bookingModel.countDocuments({bookingHostId: hostId})
      return totalGuest
    } catch (error) {
      return error.message
    }
  }
});

module.exports = hostService;
