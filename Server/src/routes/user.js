const express = require('express');

const router = new express.Router();

const {
    create_user,
    user_login,
    user_logout,
} = require('../controllers/user');


// Create new user
router.post('/api/createUser', create_user);
// user signin
router.post('/api/userLogin', user_login);
// user logout
router.post('/api/userLogout', user_logout);



module.exports = router;