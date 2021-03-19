module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        originFileName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
return Image;
};