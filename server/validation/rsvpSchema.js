
const Joi = require('joi');

const rsvpSchema = Joi.object({

    name: Joi.string().trim().max(75).required(),
    email: Joi.string().trim().email().lowercase(),
    attending: Joi.boolean().optional(),
    plusOne: Joi.boolean().optional(),
    songChoice: Joi.string().trim().max(100).default('').empty('').optional(),
    dietaryRestrictions: Joi.string().trim().max(200).default('').empty('').optional(),
    comments: Joi.string().trim().max(400).default('').empty('').optional(),
    isBringingSpecFood: Joi.boolean().optional(),

    foodOption: Joi.string().when('isBringingSpecFood', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional()
    })
});

module.exports = rsvpSchema;