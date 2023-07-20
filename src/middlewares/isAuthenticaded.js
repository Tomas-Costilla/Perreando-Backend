

const IsAuthenticated = (req,res,next) =>{
    let response = req.isAuthenticated()
    if(response) next()
    else res.status(500).json("No estas logueado")
}

module.exports = {
    IsAuthenticated
}