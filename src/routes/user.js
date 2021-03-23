import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user.controller'
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const isAuthenticated = function (req, res, next) {
   if (req.isAuthenticated())
        return next();
   res.redirect('/signin');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = './public/upload/temp';
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        cb(null, dirPath)
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.parse(file.originalname).ext);
    }
})

const uploadAvatar = multer({ storage: storage});


router.all('/*', isAuthenticated);

router.get('/:id', userController.userDetailsPage);

router.get('/:id/update',  userController.userEditPage);

router.post('/:id/update',
    uploadAvatar.single("avatar"),
    userController.updateUser);

router.get('/:id/delete', userController.deleteUser);

export default router;