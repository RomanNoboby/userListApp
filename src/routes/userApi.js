import express from 'express';
import * as usersApi from '../controllers/user.api.controller';
import * as validators from "../validators";
const router = express.Router();

// Create a new User
router.post("/", [
   validators.createUserValidator,
    usersApi.create
]);

// Retrieve all published Tutorials
router.get("/", usersApi.getAll);

// Retrieve a single Tutorial with id
router.get("/:id", usersApi.findOne);

// Update a User with id
router.put("/:id", [
    // validators.updateUserValidator,
    usersApi.update
]);

// Delete a Tutorial with id
router.delete("/:id", usersApi.delete);

// Delete all Users
router.delete("/", usersApi.deleteAll);

export default router;