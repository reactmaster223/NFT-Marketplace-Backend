const key = require('./key');
const User = require('../models/user.model');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('JWT'),
    secretOrKey: key.SECRET
}

passport.use('jwt', new JWTStrategy(opts, (jwt_payload, done) => {
    try {
        User.findOne({where: {_id: jwt_payload._id}})
            .then(user => {
                if(user) {
                    console.log('user found');
                    donne(null, user);
                }
                else {
                    console.log('user not found');
                    done(null, false);
                }
            })
    }
    catch (err) { done(err) }
}))