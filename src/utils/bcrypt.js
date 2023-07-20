const bcrypt = require("bcrypt")

const isValidPassword = (user,password) => bcrypt.compareSync(password,user.userPassword)
const createHash = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)

module.exports = {
    isValidPassword,
    createHash
}