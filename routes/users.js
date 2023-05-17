const {
  isSuperAdmin,
  canCreateAdminUser,
  isUserAlreadyRegistered,
} = require("./userChecks");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User, validateUser } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // Assigning inputs
    const { username, password, userType } = req.body;

    // const { error } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // Check if the requesting user is superadmin
    if (isSuperAdmin(userType))
      return res.status(403).send("Superadmin cannot be created!");

    // // Check if the user creating the user is SUPER_ADMIN
    // if (userType !== "superadmin") {
    //   return res.status(403).send("Only SUPER_ADMIN can create ADMIN users");
    // }

    // Check if user already exists
    if (await isUserAlreadyRegistered(username))
      return res.status(400).send("User is already registered!");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      username,
      password: hashedPassword,
      userType,
    });

    // save user to the database
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).header("x-auth-token", token).send({
      message: "user created successfully",
      userType: user.userType,
      token: token,
    });

    // Catching error
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
