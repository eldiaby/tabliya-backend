const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later',
  };

  // Handle Mongoose validation error
  if (err.name === 'ValidationError' && err.errors) {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle duplicate key error
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    customError.message = `Duplicate value entered for "${field}" field, please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle invalid ObjectId
  if (err.name === 'CastError') {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = errorHandlerMiddleware;
