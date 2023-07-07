const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

const indexRouter = require('./routes/index');
const userRouter  = require('./routes/users');
const requestLogger = require('./utilities/requestLogger');
const errorLogger = require('./utilities/errorLogger')

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    next();
  });
app.use(helmet.frameguard());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(requestLogger);
app.use('/', indexRouter);
app.use(errorLogger);

app.listen(3000);
console.log("server running on localhost 3000");

