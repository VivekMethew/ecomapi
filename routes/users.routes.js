const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controllers')

// @registers routes
router.post('/register', userController.registerUser)

// @login routes
router.post('/login', userController.loginUser)

module.exports = router