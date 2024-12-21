const Joi = require("joi");

const loginValidationSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().required(),
});

module.exports = loginValidationSchema;
