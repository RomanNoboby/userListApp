import db from '../models';
import InternalServerErrorException from "../errors/InternalServerErrorException";
const User = db.users;
const moment = require('moment');


exports.userDetailsPage = async(req, res, next) => {
    const userId = req.param('id');
    try {
        const user = await User.findByPk(userId);
        const data = {
            req,
            user,
            title: "User " + user.id,
            moment
        }
        res.render('pages/userProfile', data);
    } catch (err) {
        err.status= 500;
        err.message = err.message || "Some error occurred while retrieving users."
        next(err);
    }
}

exports.userEditPage  = async (req, res, next) => {
    const userId = req.param('id');
    try {
        const user = await User.findByPk(userId);
        const data = {
            req,
            user,
            title: "Edit user",
            moment
        }
        res.render('pages/userEdit', data);
    } catch (err) {
        err.status= 500;
        err.message = err.message || "Some error occurred while retrieving users."
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    const { name, login, email, password} = req.body ;
    const id = req.params.id;
    const updatedData = {
        name,
        login,
        email,
        password,
    }
    try {
        const num = await User.update(updatedData, {
            where: { id }
        });
        res.redirect('/');
    } catch (err) {
        next( new InternalServerErrorException("Error updating User with id=" + id));
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

