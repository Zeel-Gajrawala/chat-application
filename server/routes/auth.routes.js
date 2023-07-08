const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//login API
router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user_id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.JWT_EXP,
        }
      );

      // send token
      res.status(200).json({ token: token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      {
        user_id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.JWT_EXP,
      }
    );

    // return new user
    res.status(201).json({ token: token });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
