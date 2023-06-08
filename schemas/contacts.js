const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/\(.*\) .*-/) // number format (xxx) xxx-xxxx
    .max(14)
    .required(),
});

module.exports = { schema };
