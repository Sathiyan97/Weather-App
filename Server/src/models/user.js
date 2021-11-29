const mongoose = require('mongoose');
const validator = require("validator");
const idValidator = require("mongoose-id-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const user_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    display_name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password is invalid');
            }
        }
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    city: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

}, {
    timestamps: true
});
user_schema.plugin(idValidator);
user_schema.set('toObject', {virtuals: true});
user_schema.set('toJSON', {virtuals: true});

user_schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.__v;

    return userObject;
}

user_schema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id, role: "user"}, process.env.AUTH_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

user_schema.statics.findByCredentials = async (email, password) => {
    let e = String(email);
    const user = await User.findOne({email: e});

    if (!user) {
        throw new Error('Unable to signin');
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to signin')
    }
    return user;
};

user_schema.pre('save', async function (next) {
    const seller = this;
    if (seller.isModified('password')) {
        seller.password = await bcrypt.hash(seller.password, 8);
    }
    next();
});

const User = mongoose.model("user", user_schema);

module.exports = User;