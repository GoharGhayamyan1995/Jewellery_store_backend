const Joi = require("joi");

const registerValidator = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).required().messages({
      "string.base": `userName should be a type of 'text'`,
      "string.min": `userName should have a minimum 3 characters`,
      "string.empty": `userName cannot be an empty field`,
      "any.required": `userNameis a required field`,
    }),
    last_name: Joi.string().min(3).required().messages({
        "string.base": `lastName should be a type of 'text'`,
        "string.min": `lastName should have a minimum 3 characters`,
        "string.empty": `lastName cannot be an empty field`,
        "any.required": `lastNameis a required field`,
      }),
      city: Joi.string().min(3).required().messages({
        "string.base": `city should be a type of 'text'`,
        "string.min": `city should have a minimum 3 characters`,
        "string.empty": `city cannot be an empty field`,
        "any.required": `city a required field`,
      }),
    email: Joi.string()
      .email()
      .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
      .required()
      .messages({
        "string.base": `email should be a type of 'text'`,
        "string.email": `Invalid email address`,
        "string.pattern.base": "Email format is not correct",
        "string.empty": `email cannot be an empty field`,
        "any.required": `email is a required field`,
      }),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.base": `password should be a type of 'text'`,
        "string.min": `password should have a minimum 6 characters`,
        "string.pattern": `password should have [a-zA-Z0-9]`,
        "string.empty": `password cannot be an empty field`,
        "any.required": `passwordis a required field`,
      }),
    //   phone: Joi.string().min(6).required().messages({
    //     "string.base": `lastName should be a type of 'text'`,
    //     "string.min": `lastName should have a minimum 6 characters`,
    //     "string.empty": `lastName cannot be an empty field`,
    //     "any.required": `lastNameis a required field`,
    //   }),
    phone: Joi.string().regex(/^[0-9]{12}$/).messages({'string.pattern.base': `Phone number must have 12 digits.`}).required()
  });

  return schema.validate(data);
};

const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required().messages({
      "string.base": `email should be a type of 'text'`,
      "string.min": `email should have a minimum 6 characters`,
      "string.email": `Invalid email address`,
      "string.empty": `email cannot be an empty field`,
      "any.required": `email is a required field`,
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": `password should be a type of 'text'`,
      "string.min": `password should have a minimum 6 characters`,
      "string.empty": `password cannot be an empty field`,
      "any.required": `password is a required field`,
    }),
  });
  return schema.validate(data);
};

module.exports = { registerValidator, loginValidator };