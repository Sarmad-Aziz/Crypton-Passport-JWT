import express from 'express';
import controller from '../controller/userController';
import passport from '../Middlewares/passportMiddleware';


const router = express.Router();

router.post('/signUp', controller.signUp);

router.post('/login',  controller.login);

export = router;
