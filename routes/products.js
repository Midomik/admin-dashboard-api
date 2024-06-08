const express = require('express');

const validateSchema = require('../middlewares/validateSchema');
const productSchema = require('../schemas/product');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', validateSchema(productSchema), productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
