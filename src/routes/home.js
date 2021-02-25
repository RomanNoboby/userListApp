import express from 'express';
const router = express.Router();
import * as homeController from '../controllers/home.controller'
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('pages/index', { title: 'Express' });
// });


router.get('/', homeController.index)

export default router;