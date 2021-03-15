import db from '../models';
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Login address already in use!!!'
            },
            validate: {
                isUnique:  function (value, next) {
                    let self = this;
                    db.users.findOne({where: {login: value}})
                        .then(function (user) {
                            // reject if a different user wants to use the same login
                            if (user && self.id !== user.id) {
                                return next('Login already in use!');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            }
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
        },
        is_authorized: {
            type: Sequelize.BOOLEAN
        }
    // }, {
    //     defaultScope: {
    //         exclude: ['password']
    //     }
    });
    return User;
};