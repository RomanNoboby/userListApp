import fs from 'fs';
import path from 'path';
import InternalServerErrorException from './../errors/InternalServerErrorException'
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
    }, {
        hooks: {
            beforeCreate(image) {
                const imagesDirPath = path.join(__dirname,'./../../public/upload/avatars');
                const tempDirPath = path.join(__dirname,'./../../public/upload/temp');

                if (!fs.existsSync(imagesDirPath)){
                    fs.mkdirSync(imagesDirPath);
                }
                fs.rename(path.join(tempDirPath,image.fileName), path.join(imagesDirPath,image.fileName),(err) => {
                    if (err) throw err;
                    console.log('Rename image complete!');
                });
            },
            afterDestroy(image) {
                const imagesDirPath = path.join(__dirname,'./../../public/upload/avatars');
                try{
                    fs.unlinkSync(path.join(imagesDirPath,image.fileName));
                } catch (err){
                    throw new InternalServerErrorException('Error: DeletingError. File not found ');
                }
            }
        }
    });
    return Image;
};