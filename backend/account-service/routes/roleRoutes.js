const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const isSeller = require('../middleware/isSeller');

router.get('/admin', isAdmin, (req, res) => {
    res.render('adminPanel', { user: req.user });
});

router.get('/seller', isSeller, (req, res) => {
    res.render('sellerPanel', { user: req.user });
});