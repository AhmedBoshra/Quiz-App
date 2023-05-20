const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/controllers");

// Sign users up
router.post("/signup", signUp);

// Sign users in
router.post("/signin", signIn);

module.exports = router;
