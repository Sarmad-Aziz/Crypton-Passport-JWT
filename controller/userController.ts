import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');

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
  const passowrd = req.body.password;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (user.password === passowrd) {
        const token = jwt.sign({ sub: user.id }, 'abcd', {
          expiresIn: '7d',
        });

        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    })

    .catch((err) => {
      res.status(500).json({ message: 'An error occurred' });
    });
};

const test = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  return res.status(200).json({ message: 'token', user: user });
};

export default {
  signUp,
  login,
  test,
};
