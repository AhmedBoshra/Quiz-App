const mongoose = require("mongoose");

// Connect to MongoDB
async function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://ahmedboshra96:kvSkKwBnWQCNSwc4@atlascluster.83ixuig.mongodb.net/usersDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected to MongoDB ..."))
    .catch((err) => console.error("Could not connect to MongoDB", err));
}
module.exports = { connectDB };
