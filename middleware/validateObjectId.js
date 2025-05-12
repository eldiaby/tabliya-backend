// middlewares/validateObjectId.js
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  next();
};

module.exports = validateObjectId;
