import passport from 'passport';
import User from '../Model/user';
import { Strategy as localStrategy } from 'passport-local';
import { Router, Request, Response } from 'express';

passport.use(
  new localStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
    },

    async (userName, password, done) => {
      const user = await User.findOne({ userName });

      //@ts-ignore

      if (user && (await user.comparePassword(password))) done(null, user);
      else done(null, false);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (req: Request, id: string, done: any) => {
  try {
    const user = await User.findById(id);
    console.log('cccc');
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
