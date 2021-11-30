const User = require('../models/user');


const bcrypt = require("bcryptjs");

// Create user
const create_user = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// user signin
const user_login = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );



        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch (e) {
        res.status(400).send(e.message);
    }
};

// user logout
const user_logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send({message: 'you are logged out'})
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = {
    create_user,
    user_login,
    user_logout,

};