const countryService = ({countryRepository}) =>({
    async createCountryService(countryData){
        return countryRepository.createCountryRepository(countryData)
    },
    async getAllCountriesService(){
        return countryRepository.getAllCountriesRepository()
    }
})

module.exports = countryService;