const { User, validateUser } = require("../models/user");
const express = require("express");

function isSuperAdmin(userType) {
  return userType === "superadmin";
}

function canCreateAdminUser(userType) {
  return userType === "admin";
}

async function isUserAlreadyRegistered(username) {
  return (await User.findOne({ username })) !== null;
}

module.exports = { isSuperAdmin, canCreateAdminUser, isUserAlreadyRegistered };
