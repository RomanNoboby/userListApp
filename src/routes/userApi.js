import express from 'express';
import * as usersApi from '../controllers/user.api.controller';
const router = express.Router();
// const usersApi = require("../controllers/user.api.controller.js");

// Create a new User
router.post("/", usersApi.create);

// Retrieve all published Tutorials
router.get("/", usersApi.getAll);

// Retrieve a single Tutorial with id
router.get("/:id", usersApi.findOne);

// Update a User with id
router.put("/:id", usersApi.update);

// Delete a Tutorial with id
router.delete("/:id", usersApi.delete);

// Delete all Users
router.delete("/", usersApi.deleteAll);

export default router;