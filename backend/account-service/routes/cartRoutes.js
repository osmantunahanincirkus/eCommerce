const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated.js');
const cartController = require('../controllers/cartController');

router.post('/cart', isAuthenticated, cartController.createCart);
router.get('/cart', isAuthenticated, cartController.getCart);
router.put('/cart/add', isAuthenticated, cartController.addItem);
router.put('/cart/update', isAuthenticated, cartController.updateItem);
router.delete('/cart/remove', isAuthenticated, cartController.removeItem);

module.exports = router;