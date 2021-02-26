module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        login: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        is_authorized: {
            type: Sequelize.BOOLEAN
        }
    }, {
        defaultScope: {
            exclude: ['password']
        }
    });
    return User;
};