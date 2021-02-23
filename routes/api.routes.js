module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve all published Tutorials
    router.get("/", users.getAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);



    // Update a User with id
    router.put("/:id", users.update);

    // Delete a Tutorial with id
    router.delete("/:id", users.delete);

    // Delete all Users
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};