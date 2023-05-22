const mongoose = require("mongoose");

// Connect to MongoDB
async function connectDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/usersdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to MongoDB ..."))
    .catch((err) => console.error("Could not connect to MongoDB", err));
}
module.exports = { connectDB };
