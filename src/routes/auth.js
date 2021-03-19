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

function  shouldByNoAuthenticated (req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/');
}

function shouldByAuthenticated  (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

module.exports = function (passport) { //todo Reformat to export

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/signup', [
        shouldByNoAuthenticated,
        authController.signUpPage
    ]);

    router.post('/signup',[
        shouldByNoAuthenticated,

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
        }),
    ]);


    router.get('/signin', [
        shouldByNoAuthenticated,
        authController.loginPage
    ]);

    router.post('/signin', [
        shouldByNoAuthenticated,

        body('login')
            .isLength({ min: 6 })
            .withMessage('Login must be at least 6 characters'),

        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),

        passport.authenticate('local-signIn', {
        successRedirect: '/',
        failureRedirect: '/signin'
        })
    ]);

    router.get('/updateuserprofile', shouldByAuthenticated, function (req,res,next){
        res.redirect('/user/' + req.user.id + '/update' );
    })

    return router
}