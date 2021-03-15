import express from 'express';

const router = express.Router();
import * as authController from '../controllers/auth.controllers'
import db from '../models';
const { body } = require('express-validator');


const isEqualPassword = (value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
    }
    return true;
}
const isLoginUnique = async (value) => {
    return db.users.findOne({where: {login: value}}).then(user => {
        if (user) {
            return Promise.reject('Login already in use');
        }
    });
}


module.exports = function (passport) { //todo Reformat to export

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function  isNotAuthenticated (req, res, next) {
        if (!req.isAuthenticated())
            return next();
        res.redirect('/');
    }




    router.get('/signup', [
        isNotAuthenticated,
        authController.signUpPage
    ]);





    router.post('/signup',[
        isNotAuthenticated,

        body('login')
            .isLength({ min: 6 })
            .withMessage('Login must be at least 6 characters')
            .bail()
            .custom(isLoginUnique),

        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),

        body('passwordConfirmation')
            .custom(isEqualPassword)
            .withMessage('Password confirmation must be equal to password'),

        passport.authenticate('local-signUp', {
            successRedirect: '/updateuserprofile',
            failureRedirect: '/signup',
            // failureRedirect: '/auth/temp/result',

            // failureFlash: true,
        }),
    ]);

    router.get('/auth/temp/result', (req,res,next)=>{
        // res.send(req.session);
        // console.log(req.flash('formErrors'));
        res.send(req.session);
    });

    router.get('/signin', [
        isNotAuthenticated,
        authController.loginPage
    ]);

    router.post('/signin', [
        isNotAuthenticated,
        passport.authenticate('local-signIn', {
        successRedirect: '/',
        failureRedirect: '/signin'
        })
    ]);

    const isAuthenticated = function (req, res, next) {
        // if (req.isAuthenticated())
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    router.get('/updateuserprofile', isAuthenticated, function (req,res,next){
        res.redirect('/user/' + req.user.id + '/update' );
    })

    return router
}