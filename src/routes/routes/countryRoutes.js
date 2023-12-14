module.exports = (router,{countryController})=>{
    router
        .post("/country",countryController.createCountryController)
        .get("/country",countryController.getAllCountriesController)

    return router;
}