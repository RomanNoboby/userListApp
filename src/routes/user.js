import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user.controller'
import * as validators from "../validators";
const { body } = require('express-validator');


const isAuthenticated = function (req, res, next) {
   if (req.isAuthenticated())
        return next();
   res.redirect('/signin');
}




router.all('/*', isAuthenticated);

router.get('/:id', userController.userDetailsPage);

router.get('/:id/update', userController.userEditPage);

router.post('/:id/update',  userController.updateUser);

router.get('/:id/delete', userController.deleteUser);

export default router;