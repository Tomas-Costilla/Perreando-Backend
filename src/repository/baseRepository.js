
const createData = (model,data) =>{
    return model.create(data)
}

const getAllData = (model) =>{
    return model.find({})
}

const updateDataById = (model,dataId,dataToUpdate) =>{
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