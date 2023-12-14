const countryController = ({countryService}) =>({
    async createCountryController(req,res){
        try {
            await countryService.createCountryService(req.body)
            res.json({message: "Se creo con exito el pais habilitado"})
        } catch (error) {
            res.status(500).json({message: error.message})   
        }
    },
    async getAllCountriesController(req,res){
        try {
            let countries = await countryService.getAllCountriesService()
            res.json({message:"Paises disponibles",countries})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
})

module.exports = countryController;