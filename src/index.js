/* Develop mode */
const app = require('./server/server')
const {PORT} = require('./config/globals')
const getConnection = require("./dao/connection")

getConnection().then(result=>{
    console.log(result);
    app.listen(PORT,()=> console.log(`Servidor ejecutandose en localhost:${PORT}`))
}).catch(err=>console.log(err))
