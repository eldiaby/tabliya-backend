// middleware/validate.js
module.exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map((d) => d.message),
    });
  }

  next();
};
