import { NextFunction, Request, Response } from 'express';
import passport from '../Middlewares/passportMiddleware';

import mongoose from 'mongoose';
import User from '../Model/user';

const signUp = (req: Request, res: Response, next: NextFunction) => {
  const { userName, password } = req.body;

  const user = new User({
    userName,
    password,
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log('clicked');

  passport.authenticate('local', (err, user, info) => {
    console.log(user);
    if (!user) return res.status(401).json({ message: 'not match' });
    req.login(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        user,
      });
    });
  })(req, res, next);

  // const { userName, password } = req.body;
  // const user = await User.findOne({ userName: userName });

  // if (!user) {
  //   return res.status(404).json({ message: 'not found' });
  // }
  // let loadedUser = user;
  // if (password !== user.password) {
  //   return res.status(404).json({ message: 'login Not successfull' });
  // }
  // return res.status(200).json({ message: 'login successfull' });
};

export default {
  signUp,
  login,
};
