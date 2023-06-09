const { User } = require("../models/user");

function isSuperAdmin(userType) {
  return userType === "superadmin";
}

async function isUserAlreadyRegistered(username) {
  return (await User.findOne({ username })) !== null;
}

module.exports = { isSuperAdmin, isUserAlreadyRegistered };
