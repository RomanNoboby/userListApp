const db = require("../models");
const User = db.users;
// const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.login) {
        console.log(res.body);
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create User
    const user = {
        login: req.body.login,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        is_authorized: req.body.is_authorized ? req.body.is_authorized : false
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    const filterParam = {
        attributes: {
            exclude: ['password','createdAt', 'updatedAt'],
        }
    }

    User.findByPk(id, filterParam)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.getAll = (req, res) => {
    const filterParam = {
        attributes: {
            exclude: ['password','createdAt', 'updatedAt'],
        }
    }

    User.findAll(filterParam)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    const updatedData = {
        login: req.body.login,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        is_authorized: req.body.is_authorized ? req.body.is_authorized : false
    }


    exports.findOne = (req, res) => {
        const id = req.params.id;

        User.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving User with id=" + id
                });
            });
    };

    User.update(updatedData, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};



