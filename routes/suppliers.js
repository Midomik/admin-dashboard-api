const express = require('express');

const validateSchema = require('../middlewares/validateSchema');
const supplierSchema = require('../schemas/supplier');

const supplierController = require('../controllers/supplier');

const router = express.Router();

router.get('/', supplierController.getSuppliers);
router.post(
  '/',
  validateSchema(supplierSchema),
  supplierController.addSupplier
);
router.put('/:id', supplierController.updateSupplier);

module.exports = router;
