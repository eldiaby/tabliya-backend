const express = require('express');
const dishController = require('../controllers/dishController.js');
const dishValidation = require('./../utils/validations/dishvalidation.js');
const validateMiddleware = require('./../middleware/validationMidlleware.js');
const {
  authenticateUser,
} = require('./../middleware/authenticationMiddleware.js');
const {
  authorizePermission,
} = require('./../middleware/authorizationMiddleware.js');
const validateObjectId = require('./../middleware/validateObjectId.js');
const upload = require('./../middleware/cloudUpload.js');
const router = express.Router();

router
  .route('/')
  .get(dishController.getAllDishes)
  .post(
    authenticateUser,
    authorizePermission('admin', 'manger'),
    upload.single('image'),
    validateMiddleware.validate(dishValidation.dishCreateSchema),
    dishController.createDish
  );

router
  .route('/:id')
  .get(validateObjectId, dishController.getDish)
  .patch(
    validateObjectId,
    validateMiddleware.validate(dishValidation.dishUpdateSchema),
    dishController.updateDish
  )
  .delete(validateObjectId, dishController.deleteDish);

module.exports = router;
