const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
    name: {type: String,required: true, trim: true, maxlength: 75},
    email: {type: String, trim: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'], lowercase: true},
    attending: {type: Boolean},
    plusOne: {type: Boolean},
    songChoice: {type: String, maxlength: 100, trim: true, default: ''},
    dietaryRestrictions: {type: String, maxlength: 200, trim: true, default: ''},
    comments: {type: String, maxlength: 400, trim: true, default: ''},
    isBringingSpecFood: {type: Boolean},
    foodOption: {type: String, default: 'Appetizer'},
},
{ collection: 'party_rsvps', timestamps: true });

module.exports = mongoose.model('Rsvp', RsvpSchema);
