const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is Required']
    },
    email: {
        type: String,
        required: [true, 'Email Id is Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;