class DBConnectionError extends Error{
    constructor(message){
        super(message)
        this.name = 'DBConnectionError'
    }
}

class UserError extends Error{
    constructor(message){
        super(message)
        this.name = 'UserError'
    }
}

module.exports = {
    DBConnectionError,
    UserError
}