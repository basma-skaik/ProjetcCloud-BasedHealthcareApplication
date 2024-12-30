const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const connectMongoDB = require("./config/mongo.config");
require("dotenv").config();
const authRoutes = require("./app/routes/auth.routes");
const patientRoutes = require("./app/routes/patient.routes");

const app = express();

connectMongoDB();

// Middleware
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
db.sequelize.sync({ force: false });
// if (process.env.NODE_ENV === "development") {
//   db.sequelize.sync({ force: false, alter: true });
// } else {
//   db.sequelize.sync({ force: false });
// }

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to Cloud-Based Healthcare Application.",
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
