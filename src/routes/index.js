const express = require('express')
const cors = require('cors')
const compression = require('compression')
const passport = require('passport')
const session = require('express-session')
const router = express.Router()

module.exports = (routes) =>{

    /* Router Config */
    router
        /* .use(express.static()) */
        .use(express.urlencoded({extended: true}))
        .use(express.json())
        .use(cors())
        .use(compression())
        .use(session({
            secret:'secretpassword',
            saveUninitialized:true,
            resave:true
        }))
        .use(passport.initialize())
        .use(passport.session())

        /* Api Inyection routes */
        router.use('/api/user',routes(router).userRoutes)
        router.use('/api/host',routes(router).hostRoutes)
        router.use('/api/booking',routes(router).bookingRoutes)
        router.use('/api/rating',routes(router).hostRatingRoutes)

        /* Initial route */
        router.get('/',(req,res)=> res.status(200).json({message: "Bienvenido a la API Perreando-app"}))

        return router;
}