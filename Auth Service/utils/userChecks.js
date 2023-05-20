const { User } = require("../models/user");

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
