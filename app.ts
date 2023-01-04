const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
import passport from './Middlewares/passportMiddleware';
import sessionMiddleware from './Middlewares/sessionMiddleware';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(sessionMiddleware);
// app.use(passport.session());

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(userRoutes);

app.get('/abc', (req: Request, res: any, next: any) => {
  res.send('Typescript working');
});
console.log('Running on 8080 ');

mongoose
  .connect(
    'mongodb+srv://sarmad:root@cluster0.zsix0ms.mongodb.net/Task?retryWrites=true&w=majority'
  )
  .then((result: any) => {
    app.listen(8080);
  })
  .catch((err: any) => console.log(err));
