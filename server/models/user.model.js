const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: "Please Enter FullName",
        min: 1,
        max: 255
    },
    last_name: {
        type: String,
        required: "Please Enter FullName",
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: "Please Enter Email",
        unique: true,
    },
    password: {
        type: String,
        minlength: [6, "Password must be atleast 6 characters long"],
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;