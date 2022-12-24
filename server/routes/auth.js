
const express = require('express');
const {signup,signin} = require('../controllers/auth');
const router = express.Router();

// Create a user
router.post('/signup',signup)

// Sign in
router.post('/signin',signin)

// Google Authentication
router.post('/google',)


module.exports = router;