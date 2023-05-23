const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const { connectDB } = require("./db");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middlewares
app.use(bodyParser.json());
app.use("/api", routes);

// Connect Database
connectDB();

app.listen(3000, () => console.log("listening on port 3000"));
