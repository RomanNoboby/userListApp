import db from '../models';
const User = db.users;
const moment = require('moment');

exports.index  = async (req, res) => {
    const filterParam = {
        attributes: {
            exclude: ['password'],
        }
    }
    try {
        const users = await User.findAll(filterParam);
        const data = {
            users,
            title: "HomePage",
            moment
        }
        console.log(data.users[0].createdAt);
        console.log(typeof data.users[0].createdAt);

        res.render('pages/index', data);


        // res.send(users);




    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
};