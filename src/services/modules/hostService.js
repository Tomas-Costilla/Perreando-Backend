const { hostModel, hostRating, userModel } = require("../../dao/db");
const { CLOUDINARY_IMAGEURL } = require("../../config/globals");
const { default: mongoose } = require("mongoose");
const moment = require('moment')


const hostService = () => ({
  async createHostService(data) {
    return hostModel.create(data);
  },
  async addGuestToHostService(data) {
    let { hostId, guestId, hostReserveDateFrom, hostReserveDateTo } = data;
    let host = await hostModel.findById({ _id: hostId });

    host.hostGuests.push({
      guestId: guestId,
      hostReserveDateFrom,
      hostReserveDateTo,
    });

    let result = await hostModel.updateOne({ _id: hostId }, host);
    if(result.modifiedCount>0) return true
    else return false
  },
  async getHostInfoService(hostId) {
    try {
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
      await hostModel.findOneAndDelete({ hostOwnerId: hostowId });
      await hostRating.findOneAndDelete({ hostOwnerId: hostowId });
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
      let guestDB = await userModel.findById(guestId)
      const guestData = await hostModel.findOne({
        "hostGuests.guestId": guestId,
      });
      if (!guestData) return {}

      let userGuestData = guestData.hostGuests.find(item=>item.guestId.userEmail === guestDB.userEmail)
      let dateFrom = moment(userGuestData.hostReserveDateFrom).format("YYYY-MM-DD")
      let dateTo = moment(userGuestData.hostReserveDateTo).format("YYYY-MM-DD")
      return {
        _id:guestData._id,
        hostOwnerId: guestData.hostOwnerId,
        hostDescription: guestData.hostDescription,
        hostPrice:guestData.hostPrice,
        hostReserveDateFrom: dateFrom,
        hostReserveDateTo: dateTo
      }
    } catch (error) {
      return error.message;
    }
  },
  async deleteGuestFromHost(hostId, guestId) {
    try {
      let objectId = new mongoose.Types.ObjectId(guestId)
      let result = await hostModel.updateOne({_id: hostId},{
        $pull:{"hostGuests":{"guestId": objectId }}
      })
      return result
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

      const manipulateData = results.map((item) => {
        return {
          ...item._doc,
          imageUri: `${CLOUDINARY_IMAGEURL}${item.hostOwnerId.userImageName}`,
        };
      });

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
});

module.exports = hostService;
