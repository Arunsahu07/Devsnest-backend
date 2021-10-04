const User = require("../models/user");
const {ExtractJwt, Strategy} = require("passport-jwt");
const opt =  { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
             secretOrKey : "arun123"}
    
module.exports = passport =>{
    passport.use( 
        new Strategy(opt, async(payload, done)=>{
            await User.findOne({where: {id:  payload.user_id}})
            .then(user=>{
                if(user)
                { console.log("passport-user", user)
                return done(null, user)}
                return done(null, false)
            })
            .catch(err)
            {
                return done(null, false)
            }

        }  )
    )
}