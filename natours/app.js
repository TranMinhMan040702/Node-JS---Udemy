const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require(`${__dirname}/routes/tourRouter`);
const userRouter = require(`${__dirname}/routes/userRouter`);
// 1)MIDDLEWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toLocaleTimeString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
