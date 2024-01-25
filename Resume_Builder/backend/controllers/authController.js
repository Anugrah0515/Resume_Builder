const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
dotenv.config({path: '.../config.env'});

exports.login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({message: 'Some error Occures'});
    }
    const {email, password} = req.body;
    const userDetails = await User.findOne({email: email});
    if (!userDetails) {
        res.status(404).json({message: 'User not found'});
    }
    const userCheck = bcrypt.compareSync(password, userDetails.password);
    if (!userCheck) {
        res.status(401).json({message: 'Enter the correct password'});
    }
    const payload = {
        username: userDetails.username,
        email: userDetails.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
    res.status(200).json({message: 'Login Successfull', email: email});
}

exports.signup = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({message: 'Some error Occures'});
    }
    const {username, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userDetails = new User({
        username: username,
        email: email,
        password: hashPassword
    });

    await userDetails.save();
    const payload = {
        username: username,
        email: email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '6h'
    });
    res.status(200).json({message: 'New User Created', email: email});
}

exports.checkUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const userCheck = await User.findOne({ email });

        if (userCheck) {
            return res.status(200).json({ message: 'Old User' });
        } else {
            return res.status(200).json({ message: 'New User' });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};