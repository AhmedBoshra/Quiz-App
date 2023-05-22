const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/questions");

const app = express();

// Middlewares
app.use(bodyParser.json());

// Use the question routes for all requests starting with '/api'
app.use("/api", questionRoutes);

// Connecting MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/questionsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB ..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
