const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controllers')

const { verifyAccessToken } = require('../helpers/auth')

const { upload } = require('../middleware/uppload.files')

router.post('/create_product', verifyAccessToken, upload.single('images'), productController.createProduct)
router.get('/get_products', verifyAccessToken, productController.product_list)
router.get('/get_product/:prodid', verifyAccessToken, productController.product)
router.patch('/update_product/:prodid', verifyAccessToken, productController.updateProduct)
router.delete('/delete_product/:prodid', verifyAccessToken, productController.deleteProduct)

module.exports = router