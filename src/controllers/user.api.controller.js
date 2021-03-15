import db from '../models';
import InternalServerErrorException from "../errors/InternalServerErrorException";
const User = db.users;

exports.create = async (req, res, next) => {
    if (!req.body.login) {
        next( new InternalServerErrorException("Content can not be empty!"));
        return;
    }

    const {login, name, password, email, is_authorized } = req.body;
    const newUser = { login, name, password, email, is_authorized };
    try {
        const data = await User.create(newUser);
        res.send(data);
    } catch(err){
        next( new InternalServerErrorException("Some error occurred while creating the User."));
    }
};

exports.findOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await User.findByPk(id);
        res.send(data);
    } catch (err) {
        next( new InternalServerErrorException("Error retrieving User with id=" + id));
    }
};

exports.getAll = async (req, res, next) => {
    try {
        // console.log('!!! contentType');
        // console.log('html '+ req.is('html'));
        // console.log('text/htm '+ req.is('text/html'));
        // console.log('text/* ' + req.is('text/*'));
        // console.log('json ' + req.is('json'));
        // console.log('application/json '+ req.is('application/json'));
        // console.log('application/* ' + req.is('application/*'));
        // console.log('html '+ req.is('html'));
        // console.log(req);
        const data = await User.findAll()
        res.send(data);
    } catch (err) {
        next( new InternalServerErrorException("Some error occurred while retrieving users."));
    }
};

exports.update = async (req, res, next) => {
    const { name, login, email, password, is_authorized} = req.body ;
    const id = req.params.id;
    const updatedData = {
        name,
        login,
        email,
        password,
        // is_authorized
    }
    try {
        const num = await User.update(updatedData, {
            where: { id }
        });
        res.redirect('/');
        res.send({
            message: (Array.isArray(num) && num[0]=== 1 ) ? "User was updated successfully." :
                `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
    } catch (err) {
        next( new InternalServerErrorException("Error updating User with id=" + id));
    }
};

exports.delete = async (req, res,next) => {
    const id = req.params.id;
    const params = { where: { id }};
    try {
        await User.destroy(params)
        res.send({
            message: "User was deleted successfully!"
        });
    } catch (err){
        next( new InternalServerErrorException(`Cannot delete User with id=${id}. Maybe User was not found!`));
    }
};

exports.deleteAll = async (req, res, next) => {
    const params ={where: {}, truncate: false};
    try {
        await User.destroy(params)
    } catch(err){
        next( new InternalServerErrorException("Some error occurred while removing all tutorials."));
    }
};