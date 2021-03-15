import express from 'express';
const router = express.Router();
import * as homeController from '../controllers/home.controller'

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/signin');
}
/* GET home page. */
router.get('/', [ isAuthenticated, homeController.index]);

export default router;