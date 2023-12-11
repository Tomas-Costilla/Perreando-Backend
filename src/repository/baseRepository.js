/* const baseRepository = () =>({
    async createData(model,data){
        return model.create(data)
    },
    async getAllData(model,data){
        return model.find({})
    },
    async getDataById(model,dataId){
        console.log(model)
        console.log(dataId)
        return model.findById(dataId)
    },
    async updateDataById(model,dataId,data){
        return model.findByIdAndUpdate(dataId,data)
    }
})
 */

/* module.exports = baseRepository; */

const createData = (model,data) =>{
    return model.create(data)
}

const getAllData = (model) =>{
    return model.find({})
}

const updateDataById = ({model,dataId,dataToUpdate}) =>{
    return model.findByIdAndUpdate(dataId,dataToUpdate)
}

const getDataById = (model,dataId) =>{
    return model.findById(dataId)
}



module.exports = {
    getDataById,
    createData,
    getAllData,
    updateDataById
}