import express from 'express';
import controller from '../controller/userController';
import passport from '../Middlewares/passport-JwtMiddleware';

const router = express.Router();

router.post('/signUp', controller.signUp);

router.post('/login', controller.login);

router.post(
  '/test',
  passport.authenticate('jwt', { session: false }),
  controller.test
);

export = router;
