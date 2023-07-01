const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const userRouter  = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', indexRouter);
app.use('/', userRouter);

app.listen(3000);
console.log("server running on localhost 3000");

