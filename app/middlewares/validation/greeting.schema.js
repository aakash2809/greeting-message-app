const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().required().regex(/^[A-Z]{1}[a-zA-Z]{2,}$/),
    message: Joi.string().required().regex(/^[A-Z]{1}[a-zA-Z]{2,}$/),
});

