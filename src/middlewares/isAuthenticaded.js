

const IsAuthenticated = (req,res,next) =>{
    let response = req.isAuthenticated()
    if(response) next()
    else res.status(403).json({isLogged: false})
}

module.exports = {
    IsAuthenticated
}