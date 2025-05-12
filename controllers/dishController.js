// -----------------------------------------------------------------------------
// 📦 Imports
// -----------------------------------------------------------------------------
// 🌐 Core & Third-party Imports
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

// 🗂️ Models
const Dish = require('../models/dishModel.js');

// 🛠️ Custom Error handler
const CustomeError = require('./../errors');

// -----------------------------------------------------------------------------
// 🍽️ Get All Dishes Function
// -----------------------------------------------------------------------------
/**
 * @description Retrieves all dishes from the database
 * @route GET /api/v1/dishes
 * @access Public
 * @returns {Object} JSON response with success status, count, and data (list of dishes)
 */
module.exports.getAllDishes = asyncHandler(async (req, res, next) => {
  const dishes = await Dish.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    count: dishes.length,
    data: dishes,
  });
});

// -----------------------------------------------------------------------------
// 🍽️ Get Single Dish Function
// -----------------------------------------------------------------------------
/**
 * @description Retrieves a specific dish by its ID
 * @route GET /api/v1/dishes/:id
 * @param {string} id - The ID of the dish to retrieve
 * @access Public
 * @returns {Object} JSON response with success status and the requested dish data
 * @throws {NotFoundError} If the dish with the given ID is not found
 */
module.exports.getDish = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findById(req.params.id);

  // If dish is not found, throw custom NotFoundError
  if (!dish) {
    throw new CustomeError.NotFoundError(
      `There is no item with this id: ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: dish,
  });
});

// -----------------------------------------------------------------------------
// 🍽️ Create New Dish Function
// -----------------------------------------------------------------------------
/**
 * @description Creates a new dish in the database
 * @route POST /api/v1/dishes
 * @body {Object} Dish data including name, description, price, category, available, and image
 * @access Public
 * @returns {Object} JSON response with success status, a success message, and the created dish data
 */
module.exports.createDish = asyncHandler(async (req, res, next) => {
  // Destructure dish details from request body
  const { name, description, price, category, available } = req.body;

  // Check if an image file is uploaded
  const image = req.file ? req.file.path : null;

  // Create a new dish in the database
  const newDish = await Dish.create({
    name,
    description,
    price: +price, // Ensure price is treated as a number
    category,
    available,
    image,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Dish created successfully',
    data: newDish,
  });
});

// -----------------------------------------------------------------------------
// 🍽️ Update Dish Function
// -----------------------------------------------------------------------------
/**
 * @description Updates an existing dish by its ID
 * @route PUT /api/v1/dishes/:id
 * @param {string} id - The ID of the dish to update
 * @body {Object} Updated dish data
 * @access Public
 * @returns {Object} JSON response with success status, a success message, and the updated dish data
 * @throws {NotFoundError} If the dish with the given ID is not found
 */
module.exports.updateDish = asyncHandler(async (req, res, next) => {
  // Attempt to find and update the dish by its ID
  const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated dish
    runValidators: true, // Run schema validation
  });

  // If the dish is not found, throw custom NotFoundError
  if (!updatedDish) {
    throw new CustomeError.NotFoundError(
      `There is no item with this id: ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Dish Updated successfully',
    data: updatedDish,
  });
});

// -----------------------------------------------------------------------------
// 🍽️ Delete Dish Function
// -----------------------------------------------------------------------------
/**
 * @description Deletes a specific dish by its ID
 * @route DELETE /api/v1/dishes/:id
 * @param {string} id - The ID of the dish to delete
 * @access Public
 * @returns {Object} JSON response with success status, a success message, and the deleted dish data
 * @throws {NotFoundError} If the dish with the given ID is not found
 */
module.exports.deleteDish = asyncHandler(async (req, res, next) => {
  // Attempt to find and delete the dish by its ID
  const dish = await Dish.findByIdAndDelete(req.params.id);

  // If the dish is not found, throw custom NotFoundError
  if (!dish) {
    throw new CustomeError.NotFoundError(
      `There is no item with this id: ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Dish deleted successfully',
    data: dish,
  });
});
