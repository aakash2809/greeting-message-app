const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().required(),
    message: Joi.string().required(),
});

