const express = require('express');
const tableController = require('../controllers/tableController.js');
const tableValidation = require('./../utils/validations/tableValidation.js');
const validateMiddleware = require('./../middleware/validationMidlleware.js');
const {
  authenticateUser,
} = require('./../middleware/authenticationMiddleware.js');
const {
  authorizePermission,
} = require('./../middleware/authorizationMiddleware.js');

const router = express.Router();

router
  .route('/')
  .get(tableController.getAllTables)
  .post(
    authenticateUser,
    authorizePermission('admin', 'manger'),
    validateMiddleware.validate(tableValidation.createTableSchema),
    tableController.createTable
  );

router
  .route('/:id')
  .get(tableController.getTable)
  .patch(
    authenticateUser,
    authorizePermission('admin', 'manger'),
    validateMiddleware.validate(tableValidation.updateTableSchema),
    tableController.updateTable
  )
  .delete(
    authenticateUser,
    authorizePermission('admin', 'manger'),
    tableController.deleteTable
  );

module.exports = router;
