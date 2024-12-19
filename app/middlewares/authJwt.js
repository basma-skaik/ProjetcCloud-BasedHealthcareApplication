const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../../db/models");

const User = db.User;
const Role = db.Role;

// Verify JWT Token
verifyToken = (req, res, next) => {
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

  // Check User Role
  checkRole = (req, res, next) => {
    User.findByPk(req.usrId).then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: `User ${user.usrId} Not found!` });
      }

      Role.
    });
  };
};
