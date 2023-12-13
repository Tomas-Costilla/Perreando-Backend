const fs = require("fs")
const deleteUploadFile = path =>{
    fs.access(path,error=>{
        if(!error) fs.unlinkSync(path)
        else console.log("ocurrio un error al querer eliminarlo");
    })
}

module.exports = deleteUploadFile