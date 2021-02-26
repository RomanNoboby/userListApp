import db from '../models';
const User = db.users;
const moment = require('moment');

exports.index  = async (req, res) => {
    try {
        const users = await User.findAll();
        const data = {
            users,
            title: "HomePage",
            moment
        }
        res.render('pages/index', data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
};

exports.loginPage = async (req, res) => {
         res.render('pages/login', {title: 'UserList Login'});
}