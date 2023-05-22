const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const { connectDB } = require("./db");
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use("/api", routes);

// Connect Database
connectDB();

app.listen(3000, () => console.log("listening on port 3000"));
