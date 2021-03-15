import db from '../models';
import InternalServerErrorException from "../errors/InternalServerErrorException";
const User = db.users;
const moment = require('moment');

exports.index  = async (req, res, next) => {
    try {
        const users = await User.findAll();
        const data = {
            req,
            users,
            title: "HomePage",
            moment
        }
        res.render('pages/index', data);
    } catch (err) {
        err.status= 500;
        err.message = err.message || "Some error occurred while retrieving users."
        next(err);
    }
};
