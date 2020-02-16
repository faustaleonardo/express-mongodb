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

const handleCastError = error => {
  const value = `Invalid ${error.path}: ${error.value}`;
  return new AppError(value, 400);
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
    if (error.name === 'CastError') {
      error = handleCastError(error);
    }

    // Duplicate keys

    // Validation Errors

    sendErrorProd(error, res);
  }
};
