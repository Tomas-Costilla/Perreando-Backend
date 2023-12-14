const countryModel = require('../../dao/db/models/countryModel')
const baseRepository = require('../baseRepository')

const countryRepository = () =>({
    async createCountryRepository(countryData){
        let countryDB = await countryModel.findOne({countryName: countryData.countryName})
        if(countryDB) throw new Error("Este pais ya se encuentra habilitado")
        return baseRepository.createData(countryModel,countryData)
    },
    async getAllCountriesRepository(){
        return baseRepository.getAllData(countryModel)
    }
})

module.exports = countryRepository;