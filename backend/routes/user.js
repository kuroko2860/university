const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Logout user
router.post('/logout', userController.logoutUser);



module.exports = router;
