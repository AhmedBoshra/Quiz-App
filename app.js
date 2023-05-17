const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/usersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB ..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.listen(3000, () => console.log("listening on port 3000"));
