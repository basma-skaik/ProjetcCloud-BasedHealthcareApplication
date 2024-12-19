const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://your-frontend-domain.com", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "basma-session",
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "strict",
  })
);

const db = require("./db/models");
if (process.env.NODE_ENV === "development") {
  db.sequelize.sync({ force: false, alter: true });
} else {
  db.sequelize.sync({ force: false });
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Cloud-Based Healthcare Application.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
