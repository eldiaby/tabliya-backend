// -----------------------------------------------------------------------------
// 📦 Imports
// -----------------------------------------------------------------------------
// 🌐 Core & Third-party Imports
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

// 🗂️ Models
const Table = require('../models/tableModel.js');

// -----------------------------------------------------------------------------
// 📘 Controllers
// -----------------------------------------------------------------------------

/**
 * @desc    Fetch all tables
 * @route   GET /api/tables
 * @access  Public
 */
exports.getAllTables = asyncHandler(async (req, res) => {
  const tables = await Table.find({}).lean();

  res.status(StatusCodes.OK).json({
    success: true,
    count: tables.length,
    data: tables,
  });
});

/**
 * @desc    Get single table by ID
 * @route   GET /api/tables/:id
 * @access  Public
 */
exports.getTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id).lean();

  if (!table) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Table not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: table,
  });
});

/**
 * @desc    Create a new table
 * @route   POST /api/tables
 * @access  Admin, Manger
 */
exports.createTable = asyncHandler(async (req, res) => {
  const table = await Table.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Table created successfully',
    data: table,
  });
});

/**
 * @desc    Update a table by ID
 * @route   PUT /api/tables/:id
 * @access  Admin, Manger
 */
exports.updateTable = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const table = await Table.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!table) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Table not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Table updated successfully',
    data: table,
  });
});

/**
 * @desc    Delete a table by ID
 * @route   DELETE /api/tables/:id
 * @access  Admin, Manger
 */
exports.deleteTable = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const table = await Table.findByIdAndDelete(id);

  if (!table) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Table not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Table deleted successfully',
  });
});
