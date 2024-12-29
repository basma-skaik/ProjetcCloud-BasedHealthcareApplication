const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../../db/models");

const User = db.User;
const Role = db.Role;

// Verify JWT Token
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  // Check if the token is present and in the Bearer format
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).send({
      message: "No token provided or invalid token format!",
    });
  }

  // Extract the token part after "Bearer "
  token = token.split(" ")[1];

  // Verify the token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.usrId = decoded.id; // Store the user ID in the request object
    next();
  });
};

const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: `User ${userId} Not found!` });
    }

    const role = await Role.findByPk(user.roleId);
    if (role.roleName === "admin") {
      return next();
    }

    res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const checkDoctor = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: `User ${userId} Not found!` });
    }

    const role = await Role.findByPk(user.roleId);
    if (role.roleName === "doctor") {
      return next();
    }

    res.status(403).send({ message: "Require Doctor Role!" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const checkPatient = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: `User ${userId} Not found!` });
    }

    const role = await Role.findByPk(user.roleId);
    if (role.roleName === "patient") {
      return next();
    }

    res.status(403).send({ message: "Require Patient Role!" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  checkAdmin: checkAdmin,
  checkDoctor: checkDoctor,
  checkPatient: checkPatient,
};

module.exports = authJwt;
