const Joi = require("joi");

const signupValidationSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roleId: Joi.number().integer().required(),
});

module.exports = signupValidationSchema;
