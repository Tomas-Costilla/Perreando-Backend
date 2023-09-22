

const IsAuthenticated = (req,res,next) =>{
    let response = req.isAuthenticated()
    if(response) next()
    else res.status(403).json({message: "Tu sesión se ha caido",isLogged: false})
}

module.exports = {
    IsAuthenticated
}