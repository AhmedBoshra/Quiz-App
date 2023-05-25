const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const { connectDB } = require("./db");
const cors = require("cors");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL Error: jwtPrivateKey is not Defined");
  process.exit(1);
}

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middlewares
app.use(bodyParser.json());
app.use("/api", routes);

// Connect Database
connectDB();

app.listen(5000, () => console.log("listening on port 5000"));
