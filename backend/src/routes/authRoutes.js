const express = require('express');
const router = express.Router();
const {createUser, loginUser, logoutUser, deleteUser} = require('../controllers/authController')
const isLoggedIn = require('../middleware/isLoggedIn');

//redirect to authController when user create or login
router.post('/create',  createUser)
router.post('/login', loginUser)
router.post('/logout', isLoggedIn, logoutUser)
router.delete('/delete', isLoggedIn, deleteUser)
module.exports = router;