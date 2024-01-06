const Joi = require('joi');

module.exports = {
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128),
    },
  },
  addUser:{
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email:  Joi.string().email().required(),
      phoneNumber: Joi.string().required,
      password: Joi.string().required(),
    },
  },
}