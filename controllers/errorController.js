const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  const { status, statusCode, message, stack } = err;

  res.status(statusCode).json({
    status,
    error: err,
    message,
    stack
  });
};

const sendErrorProd = (err, res) => {
  const { status, statusCode, message } = err;
  /** Operational Error */
  if (err.isOperational) {
    res.status(statusCode).json({
      status,
      message
    });
  } else {
    /** Programming Error */
    console.log('Error 🎇', err);

    res.statusCode(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

const handleCastErrorDB = error => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = error => {
  const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 401);
};

const handleValidationErrorDB = error => {
  const errors = Object.values(error.errors).map(el => el.message);
  const message = errors.join(', ');
  return new AppError(message, 401);
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.status_code || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // CastError
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    // Duplicate Fields
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    // Validation Errors
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
