const { signupValidationSchema } = require("../validation");
const { loginValidationSchema } = require("../validation");

const validateSignup = (req, res, next) => {
  const { error } = signupValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message, // Return the first validation error message
    });
  }

  // If validation passes, proceed to the next middleware
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message, // Return the first validation error message
    });
  }

  // If validation passes, proceed to the next middleware
  next();
};

module.exports = { validateSignup, validateLogin };
