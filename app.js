const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const errorGlobalHandler = require('./controllers/errorController');

const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

/**-----------API-----------*/
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorGlobalHandler);
/**-----------END OF API-----------*/

module.exports = app;
