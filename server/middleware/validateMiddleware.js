
const validateRsvp = (req, res, next) => {

    const rsvpSchema = require('../validation/rsvpSchema');

    const { error, value } = rsvpSchema.validate(req.body, { abortEarly: false }); 

    if (error) {

        return res.status(400).json({ 
            message: 'Validation failed', 
            details: error.details.map(d => d.message) 
        });
    }


    req.validatedBody = value; 
    next();
};

module.exports = validateRsvp;
