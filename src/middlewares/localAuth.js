const LocalStrategy = require("passport-local").Strategy
const {userModel} = require("../dao/db")
const { isValidPassword } = require("../utils/bcrypt")
const {UserError} = require("../utils/errors")

module.exports = (passport) => {

    passport.use('login',new LocalStrategy({
        usernameField:'userEmail',
        passwordField:'userPassword'
    },async (email,password,done)=>{
        console.log(`llega ${email} ${password}`);
        const userDB = await userModel.findOne({userEmail: email})
        if(!userDB) return done(null,false)
        if(!isValidPassword(userDB,password)) return done(null,false)
        return done(null,userDB)
    }))

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async function (user, done) {
        /* console.log(user._id + '<- DS') */
        await userModel.findById(user).then(function(user){
            done(null, user)
          })
      });
}