// validators/dishCreateSchema
const Joi = require('joi');

module.exports.dishCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().positive().required(),
  category: Joi.string()
    .valid('main', 'starter', 'dessert', 'drink')
    .required(),
  image: Joi.string().uri().optional(),
  available: Joi.boolean().optional(),
});

// validators/dishUpdateSchema
module.exports.dishUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().min(10).max(1000),
  price: Joi.number().positive(),
  category: Joi.string().valid('main', 'starter', 'dessert', 'drink'),
  image: Joi.string().uri(),
  available: Joi.boolean(),
}).min(1);
