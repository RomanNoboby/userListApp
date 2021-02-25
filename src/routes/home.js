import express from 'express';
const router = express.Router();
import * as homeController from '../controllers/home.controller'

/* GET home page. */
router.get('/', homeController.index);
router.get('/login', function (req,res,nex) {
    res.render('pages/login', {title: 'UserList Login'});
});

export default router;