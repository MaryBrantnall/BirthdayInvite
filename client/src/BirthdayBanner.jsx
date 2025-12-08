import './BirthdayBanner.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import meta from 'vite-plugin-meta-env/client';

const BirthdayBanner = ({ sharedValue, updateSharedValue }) => {
    const [rsvpData, setRsvpData] = useState({
        name: '',
        email: '',
        attending: false,
        plusOne: false,
        songChoice: '',
        dietaryRestrictions: '',
        comments: '',
        ableToBringFood: false,
        foodOption: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRsvps = async () => {
            try {
                const response = await axios.get(`${meta.env.VITE_API_URL.SERVER_URI}/rsvps`);
                const rsvps = response.data;
                
                
                const updatedFoodOptions = {
                    appetizer: 3,
                    mainDish: 3,
                    sideDish: 3,
                    desserts: 2,
                    snacks: 2,
                    bread: 1,
                    other: 0
                };

                rsvps.forEach(rsvp => {
                    const foodOption = rsvp.foodOption?.toLowerCase();
                    switch (foodOption) {
                        case 'appetizer':
                            updatedFoodOptions.appetizer -= 1;
                            break;
                        case 'main dish':
                        case 'maindish':
                            updatedFoodOptions.mainDish -= 1;
                            break;
                        case 'side dish':
                        case 'sidedish':
                            updatedFoodOptions.sideDish -= 1;
                            break;
                        case 'desserts':
                            updatedFoodOptions.desserts -= 1;
                            break;
                        case 'snacks':
                            updatedFoodOptions.snacks -= 1;
                            break;
                        case 'bread':
                        case 'bready':
                            updatedFoodOptions.bread -= 1;
                            break;
                        case 'other':
                            updatedFoodOptions.other += 1;
                            break;
                    }
                });

                updateSharedValue(updatedFoodOptions);

            } catch (error) {
                console.error('There was an error fetching the RSVPs!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRsvps();
    }, []);

    if (loading) {
        return <div className="birthday-banner">Loading potluck options...</div>;
    }

    return (
        <div className="birthday-banner">
            <h1>You're Invited to a Very Birdy Thirty Birthday Bash!</h1>
            <p id="greeting">Join us for a fancy bird themed soiree and Potluck! Bring your favourite potluck inspired foods like finger sandwichs, deviled eggs, potato salads and casseroles (if it looks like it belongs at a 90 year old's funeral, than it's perfect! If it's bird themed, bonus points!) </p>

            <h2>Event Details:</h2>

            <div>
                <ul id="eventDetails">
                    <li><strong>The Old Fart Turning 30: </strong> Mary Brantnall</li>
                    <li><strong>Date:</strong> January 10th, 2026</li>
                    <li><strong>Time:</strong> 2:00 PM - 8:00 PM (The venue will be rented out between this time, but we will be going downtown for drinks afterwards as well!)</li>
                    <li><strong>Location:</strong> Local Council of Women Halifax, 989 Young Avenue, Halifax NS</li>
                    <li><strong>Dress Code:</strong> Fancy Bird Attire (Anywhere from business casual to formal! Feel free to wear a full on costume with wings and a beak, or simply wear the colours of your chosen bird; go all out!)</li>
                    <li><strong>RSVP By:</strong> December 15th, 2025</li>
                </ul>

                <div>What to Bring:
                    <ul>
                        <li>A potluck dish (See below for more details!)</li>
                        <li>Your favourite drink to enjoy during the celebration! (This is a BYOB event, but I will have non-alcoholic refreshments available)</li>
                        <li>Boardgames, video games (there will be a TV and projector!), anything you might think would be fun to bring along as an activity :)</li>
                    </ul>
                </div>

                <div>What I'll Provide:
                    <ul>
                        <li>A cool vintage house to have a fancy tea party in!</li>
                        <li>Plates, cups, utensils, napkins, and other necessary dining ware</li>
                        <li>Non-alcoholic refreshments (tea, coffee, water, juice, etc.)</li>
                        <li>Snacks and baked goods to enjoy before the main potluck feast!</li>
                        <li>Surprise Bags.. 👀 </li>
                        <li>A prize for best dressed birdy!</li>
                    </ul>
                </div>

                <div>What NOT to Bring:
                    <ul>
                        <li>Gifts (while I appreciate any gesture to do so, the food will be more than enough as a gift!)</li>
                        <li>LG WM3400CW Front Load Washer, 27 inch Width, 5.2 cu. ft. Washer Capacity, 1,300 RPM Washer Spin Speed, 8 Wash Cycles, 5 Temperature Settings, ENERGY STAR Certified, White colour (Sorry!)</li>
                        <li>Actual birds</li>
                    </ul>
                </div>

                <p>While I'm happy for any potluck dish you choose to bring, to prevent everyone from bringing the same kind of food (While a feast of 10 different types of devilled eggs sounds amazing, I don't think everyone would agree), I've created a list of differnt types of food for people to bring (ie. desserts, main course, side dish, etc.). Make sure to sign up for an option if you're able to bring food/are planning on joining! :)
                </p>

                <div> Potluck Options:
                    <ul>
                        <li style={sharedValue.appetizer == 0 ? {color: "#89023E"} : {color: "white"}}>Appetizer (ie. devilled eggs, bruschetta, etc.) - <strong>{sharedValue.appetizer} spots left</strong> </li>
                        <li style={sharedValue.mainDish == 0 ? {color: "#89023E"} : {color: "white"}}>Main Dish (ie. casserole, lasagna, chili etc.) - <strong>{sharedValue.mainDish} spots left </strong></li>
                        <li style={sharedValue.sideDish == 0 ? {color: "#89023E"} : {color: "white"}}>Side Dish (ie. soup, potato salad, steamed broccoli, etc.) - <strong>{sharedValue.sideDish} spots left</strong></li>
                        <li style={sharedValue.desserts == 0 ? {color: "#89023E"} : {color: "white"}}>Desserts (ie. cake, pie, cookies, etc.) - <strong>{sharedValue.desserts} spots left</strong></li>
                        <li style={sharedValue.snacks == 0 ? {color: "#89023E"} : {color: "white"}}>Snacks (ie. chips and dip, cheese platter, veggie tray, etc.) - <strong>{sharedValue.snacks} spots left</strong></li>
                        <li style={sharedValue.bread == 0 ? {color: "#89023E"} : {color: "white"}}>BREAD - <strong>{sharedValue.bread} spot left</strong></li>
                        <li>Other - If all other spots are taken, or your dish doesn't fit in with the categories listed, feel free to select this option! - <strong>{sharedValue.other} chose this option</strong></li>
                    </ul>
                </div> 
            </div>
        </div>
    );
};

export default BirthdayBanner;

