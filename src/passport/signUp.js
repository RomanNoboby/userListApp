import db from '../models';
import LocalStrategy from "passport-local";
import {validationResult} from "express-validator";
import prepareFormData from '../lib/prepearFormData';
const User = db.users;

module.exports = function (passport){
    async function verifyFunction(req, login, password, done){
        function createHash(password){
            return password;
            // return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }

        const validatorErrors = validationResult(req).errors;
        const formData = prepareFormData(['login','password','passwordConfirmation'], req, validatorErrors);

        if (validatorErrors.length){
            req.flash('formData', formData);
            return done(null,undefined);
        }

        const userData = {
            login,
            name: undefined,
            password: createHash(password),
            email: undefined,
        };

        const newUser = User.build(userData);
        try {
            await newUser.validate();
            await newUser.save();
            return done(null, newUser);
        } catch (err){
            console.log(err);
            return done(err);
        }

    }
    const localStrategy = new LocalStrategy ({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    }, verifyFunction);


    passport.use('local-signUp', localStrategy);
}
