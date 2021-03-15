import db from "../models";
import LocalStrategy from 'passport-local';

module.exports = function(passport){
    const User = db.users;

    function isValidPassword (user, password){
        return user.password === password;
        // return bCrypt.compareSync(password, user.password);
    }

    const verifyFunction = async function (req, login, password, done) {

        try {
            const user = await User.findOne({where: {login: login}});
            if (!user) {
                console.log('User Not Found with username ' + login);
                // return done(null, false, req.flash('message', 'User Not found.'));
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
                // return done(null, false, req.flash('message', 'Invalid Password'));
            }

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    };

    let localStrategy = new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    }, verifyFunction);

    passport.use('local-signIn', localStrategy);
}




