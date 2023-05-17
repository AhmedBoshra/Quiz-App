require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

// Define the user Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  userType: {
    type: String,
    required: true,
    enum: ["student", "teacher", "admin", "superadmin"],
  },
  isSuperAdmin: {
    type: Boolean,
  },
});

// creating a method in the user object to encapsulate token creation
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, userType: this.userType },
    process.env.jwtPrivateKey,
    { expiresIn: "1h" }
  );
  return token;
};

// Define the User model with Mongoose
const User = mongoose.model("User", userSchema);

// Validate user data using Joi
function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(5).required(),
    password: Joi.string().min(5).max(1024).required,
    userType: Joi.string()
      .valid("student", "teacher", "admin", "superadmin")
      .required(),
  };
  return schema.validate(user);
}

// Export the User model and validateUser function
module.exports = {
  User,
  validateUser,
};
