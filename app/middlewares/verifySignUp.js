const db = require("../../db/models");
const User = db.User;
const Role = db.Role;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { username: req.body.username } });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    // If no duplicates, proceed to the next middleware
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Unable to validate Username or Email!" });
  }
};

// Check if the roleId in the request exists in the database
const checkRoleExisted = async (req, res, next) => {
  try {
    if (req.body.roleId) {
      // Check if the `roleId` field exists in the request body
      const role = await Role.findByPk(req.body.roleId); // Query the Role table
      if (!role) {
        return res.status(400).send({
          message: `Failed! Role with ID ${req.body.roleId} does not exist.`,
        });
      }
    }
    next(); // Proceed to the next middleware if the roleId is valid
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Role ID!",
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted,
};

module.exports = verifySignUp;
