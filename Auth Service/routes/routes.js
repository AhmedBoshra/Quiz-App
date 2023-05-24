const { signUp, signIn } = require("../controllers/controllers");
const express = require("express");
const router = express.Router();

// Signup Users
router.post("/signup", signUp);

// Login Users
router.post("/signin", signIn);

module.exports = router;
