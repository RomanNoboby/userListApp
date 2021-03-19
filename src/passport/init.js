import InternalServerErrorException from "../errors/InternalServerErrorException";
import db from "../models";
import signIn from './signIn';
import signUp from './signUp';

module.exports  = function(passport){


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        const User = db.users;
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err,false)
        }
    });

    signIn(passport);
    signUp(passport);
}