import db from "../models";
import LocalStrategy from 'passport-local';
import {validationResult} from "express-validator";
import prepareFormData from '../lib/prepearFormData';
const User = db.users;


module.exports = function(passport){
    function isValidPassword (user, password){
        return user.password === password;
        // return bCrypt.compareSync(password, user.password);
    }

    const verifyFunction = async function (req, login, password, done) {
        const validatedFields = ['login','password'];
        let signInError = undefined;

        const validatorErrors = validationResult(req).errors;
        let formData = prepareFormData(validatedFields, req, validatorErrors);


        if (validatorErrors.length){

            req.flash('signIn-formData', formData);

            console.log('req.session.flash');
            console.log(JSON.stringify(req.session.flash));

            return done(null, false);
        }


        try {
            const user = await User.findOne({where: {login: login}});
            if (!user) {
                console.log('User Not Found with login ' + login);

                signInError = {
                    value: login,
                    msg: 'User Not Found with login ' + login,
                    param: 'login',
                    location: 'body'
                }
            }
            if (user && !isValidPassword(user, password)) {
                console.log('Invalid Password');
                signInError = {
                    value: password,
                    param: 'password',
                    msg: 'Invalid Password',
                    location: 'body'
                }
            }

            if (signInError){
                validatorErrors.push(signInError);
                formData = prepareFormData(validatedFields, req, validatorErrors);
                req.flash('signIn-formData'); //clear flesh.formData
                req.flash('signIn-formData', formData);
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




