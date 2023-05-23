const {
  isSuperAdmin,
  isUserAlreadyRegistered,
} = require("../utils/userChecks");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

// Registering new users
async function signUp(req, res) {
  try {
    // Assigning inputs
    const { username, password, userType } = req.body;

    // Check if the requesting user is superadmin
    if (isSuperAdmin(userType))
      return res.status(403).send("Superadmin cannot be created!");

    // Check if user already exists
    if (await isUserAlreadyRegistered(username))
      return res.status(400).send("User is already registered!");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
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
}

// Sign users in
async function signIn(req, res) {
  try {
    // Assigning inputs
    const { username, password } = req.body;

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
      username: user.username,
      userType: user.userType,
      token: token,
    });

    // Catching error
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

function validate(req) {
  const schema = {
    username: Joi.string().min(5).max(5).required(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = { signUp, signIn };
