import db from '../models';
const User = db.users;

exports.create = async (req, res) => {
    if (!req.body.login) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const {login, name, password, email, is_authorized } = req.body;
    const newUser = { login, name, password, email, is_authorized };
    try {
        const data = await User.create(newUser);
        res.send(data);
    } catch(err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await User.findByPk(id)
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving User with id=" + id
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await User.findAll()
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
};

exports.update = async (req, res) => {
    const { name, login, email, password, is_authorized} = req.body ;
    const id = req.params.id;
    const updatedData = {
        name,
        login,
        email,
        password,
        is_authorized
    }
    try {
        const num = await User.update(updatedData, {
            where: { id }
        });
        res.send({
            message: (Array.isArray(num) && num[0]=== 1 ) ? "User was updated successfully." :
                `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
    } catch (err) {
        res.status(500).send({
            message: "Error updating User with id=" + id
        });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    const params = { where: { id }};
    try {
        await User.destroy(params)
        res.send({
            message: "User was deleted successfully!"
        });
    } catch (err){
        res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
    }
};

exports.deleteAll = async (req, res) => {
    const params ={where: {}, truncate: false};
    try {
        await User.destroy(params)
    } catch(err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all tutorials."
        });
    }
};