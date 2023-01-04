import passport from 'passport';
import { Router, Request, Response } from 'express';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../Model/user';
import { ExtractJwt } from 'passport-jwt';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'abcd',
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          done(null, user);
        })
        .catch((err) => {
          done(err, false);
        });
    }
  )
);

export default passport;
