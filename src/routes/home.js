import express from 'express';
const router = express.Router();
import * as homeController from '../controllers/home.controller'

/* GET home page. */
router.get('/', homeController.index);
/* GET login page. */
router.get('/login', homeController.loginPage);

export default router;