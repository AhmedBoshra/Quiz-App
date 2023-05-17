const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Assigning inputs
    const { username, password } = req.body;

    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    let user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid User!");

    // Check if Password is valid
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Password!");

    const token = user.generateAuthToken();

    // Return success message, userType, and JWT token
    res.send({
      message: "User loggedin successfully",
      userType: user.userType,
      token: token,
    });

    // Catching error
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

function validate(req) {
  const schema = {
    username: Joi.string().min(5).max(5).required(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return schema.validate(req);
}

module.exports = router;
