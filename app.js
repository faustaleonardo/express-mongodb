const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

/**-----------API-----------*/
app.use('/api/v1/users', userRouter);
/**-----------END OF API-----------*/

module.exports = app;
