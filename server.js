const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();

const app = express();

app.use(cors());

const db = require("./app/models");
const Role = db.Role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());

app.use(
  cookieSession({
    name: "basma-session",
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Cloud-Based Healthcare Application.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
