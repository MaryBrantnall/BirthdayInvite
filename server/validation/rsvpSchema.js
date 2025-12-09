
const Joi = require('joi');

const rsvpSchema = Joi.object({

    name: Joi.string().trim().max(75).required(),
    email: Joi.string().trim().email().lowercase(),
    attending: Joi.boolean().required(),
    plusOne: Joi.boolean().optional(),
    songChoice: Joi.string().trim().max(100).default('').optional(),
    dietaryRestrictions: Joi.string().trim().max(200).default('').optional(),
    comments: Joi.string().trim().max(400).default('').optional(),
    isBringingSpecFood: Joi.boolean(),

    foodOption: Joi.string().when('isBringingSpecFood', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional()
    })
});

module.exports = rsvpSchema;