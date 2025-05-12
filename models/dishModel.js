const mongoose = require('mongoose');
const Joi = require('joi');

// تعريف الـ Joi schema
// const dishValidationSchema = Joi.object({
//   name: Joi.string().required().messages({
//     'string.base': 'Dish name should be a string',
//     'any.required': 'Dish name is required',
//   }),
//   description: Joi.string().max(500).optional().messages({
//     'string.base': 'Description should be a string',
//     'string.max': 'Description should not exceed 500 characters',
//   }),
//   price: Joi.number().required().min(0).messages({
//     'number.base': 'Price should be a number',
//     'any.required': 'Price is required',
//     'number.min': 'Price should be greater than or equal to 0',
//   }),
//   category: Joi.string()
//     .valid('starter', 'main', 'dessert', 'drink')
//     .default('main')
//     .messages({
//       'string.base': 'Category should be a string',
//       'any.only':
//         'Category should be one of the following: starter, main, dessert, drink',
//     }),
//   image: Joi.string().uri().optional().messages({
//     'string.base': 'Image URL should be a string',
//     'string.uri': 'Image URL should be a valid URI',
//   }),
//   available: Joi.boolean().default(true).messages({
//     'boolean.base': 'Available should be a boolean value',
//   }),
// });

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ['starter', 'main', 'dessert', 'drink'],
      default: 'main',
    },
    image: {
      type: String,
      default: '',
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dish', dishSchema);
