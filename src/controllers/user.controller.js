import db from '../models';
import InternalServerErrorException from "../errors/InternalServerErrorException";
const User = db.users;
const moment = require('moment');
const { body } = require('express-validator');
import { validationResult} from "express-validator";
import prepareFormData from "../lib/prepearFormData";


const isEqualPassword = (value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
    }
    return true;
}

const isLoginUnique = async (value, { req }) => {
    const user = await db.users.findOne({where: {login: value}})
    if( user ){
        if(user.id != req.params.id){
            throw new Error('Login already in use');
            return;
        }
    }
    return true;
}


exports.validate = (method) => {
    switch (method) {
        case 'updateUser': {
            return [

                body('login')
                    .isLength({ min: 6 })
                    .withMessage('Login must be at least 6 characters')
                    .bail()
                    .custom(isLoginUnique),

                body('password')
                    .isLength({ min: 6 })
                    .withMessage('Password must be at least 6 characters'),

                body('email', 'Invalid email').exists().isEmail(),
            ]
        }
    }
}


exports.userDetailsPage = async(req, res, next) => {
    const userId = req.param('id');
    try {
        const user = await User.findByPk(userId);
        const data = {req, user, title: "User " + user.id, moment}
        res.render('pages/userProfile', data);
    } catch (err) {
        err.status= 500;
        err.message = err.message || "Some error occurred while retrieving users."
        next(err);
    }
}

exports.userEditPage  = async (req, res, next) => {
    const userId = req.param('id');
    const fleshFormData = req.flash('userEdit-formData');

    try {
        const user = await User.findByPk(userId);
        const data = {req, user, formData: fleshFormData[0] || undefined, title: "Edit user", moment};
        res.render('pages/userEdit',  data);
    } catch (err) {
        err.status= 500;
        err.message = err.message || "Some error occurred while retrieving users."
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    const validatorErrors = validationResult(req).errors;
    if (validatorErrors.length){
        const formData = prepareFormData(['login','password','email', 'name'], req, validatorErrors);
        req.flash('userEdit-formData', formData);
        console.log(validatorErrors);
        res.redirect(req.protocol + '://' + req.get('host') + req.originalUrl);
        return;
    }

    const { name, login, email, password} = req.body ;
    const updatedData = {name, login, email, password}
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if(user){
            await user.update(updatedData);
        }
        res.redirect('/');
    } catch (err) {
        console.log(err);
        next( new InternalServerErrorException("Error updating User with id=" + userId));
    }
};

exports.deleteUser = async  (req, res, next) => {
    const id = req.params.id;
    const params = { where: { id }};
    try {
        await User.destroy(params)
        res.redirect('/');
    } catch (err){
        next( new InternalServerErrorException(`Cannot delete User with id=${id}. Maybe User was not found!`));
    }
}

