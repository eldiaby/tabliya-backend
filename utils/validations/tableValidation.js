const Joi = require('joi');

module.exports.createTableSchema = Joi.object({
  number: Joi.number().required().messages({
    'any.required': 'Table number is required.',
  }),
  capacity: Joi.number().min(1).required().messages({
    'any.required': 'Capacity is required.',
    'number.min': 'Capacity must be at least 1.',
  }),
  location: Joi.string()
    .valid('indoor', 'outdoor', 'balcony', 'vip')
    .default('indoor')
    .messages({
      'any.required': 'Location is required.',
      'any.only':
        'Invalid location. Valid values are: indoor, outdoor, balcony, vip.',
    }),
  status: Joi.string()
    .valid('available', 'occupied', 'reserved', 'out_of_service')
    .default('available')
    .messages({
      'any.required': 'Status is required.',
      'any.only':
        'Invalid status. Valid values are: available, occupied, reserved, out_of_service.',
    }),
  notes: Joi.string().max(200).messages({
    'string.max': 'Notes cannot be longer than 200 characters.',
  }),
});

module.exports.updateTableSchema = Joi.object({
  capacity: Joi.number().integer().min(1),
  location: Joi.string().valid('indoor', 'outdoor', 'balcony', 'vip'),
  status: Joi.string().valid(
    'available',
    'occupied',
    'reserved',
    'out_of_service'
  ),
  notes: Joi.string().max(200).allow('', null),
}).min(1);
