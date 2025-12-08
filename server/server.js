const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/dist')));

const mongoose = require('mongoose');
require('dotenv').config();
const Rsvp = require('./models/Rsvp');
const validateRsvp = require('./middleware/validateMiddleware')
const cors = require('cors');
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.post('/validate-password', async (req, res) => {

    const { submittedPassword } = req.body;
    const correctPassword = process.env.INVITE_PASSWORD;

    if (submittedPassword === correctPassword) {
        res.status(200).json({ message: 'Password is correct' });
    } else {
        res.status(401).json({ message: 'Incorrect password' });
    }
});

app.post('/rsvp', validateRsvp, async (req, res) => {

    const { name, attending, plusOne, songChoice, dietaryRestrictions, comments, isBringingSpecFood, foodOption } = req.body;

    const newRsvp = new Rsvp({
        name,
        attending,
        plusOne,
        songChoice,
        dietaryRestrictions,
        comments,
        isBringingSpecFood,
        foodOption

    });

    try {
        const savedRsvp = await newRsvp.save();
        res.status(201).json(savedRsvp);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save RSVP' });
    }
});



app.get('/rsvps', async (req, res) => {
    try {
        const rsvps = await Rsvp.find();
        res.status(200).json(rsvps);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch RSVPs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


