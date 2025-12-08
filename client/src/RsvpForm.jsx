import {useState} from 'react';
import axios from 'axios';
import './RsvpForm.css';



const RsvpForm = ({ sharedValue }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: false,
        plusOne: false,
        songChoice: '',
        dietaryRestrictions: '',
        comments: '',
        isBringingSpecFood: false,
        foodOption: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await axios.post(`${import.meta.env.VITE_API_URL.SERVER_URI}/rsvp`, formData);
            setMessage('RSVP submitted successfully!');
            setFormData({
                name: '',
                email: '',
                attending: false,
                plusOne: false,
                songChoice: '',
                dietaryRestrictions: '',
                comments: '',
                isBringingSpecFood: false,
                foodOption: ''
            });
        } catch (err) {
            setError('Failed to submit RSVP. Please try again.');
        }
    };
    return (<div className="inviteContainer">
        <img id="rsvpImage" src="ani_BlueJay1.gif" alt="birdy30-invite" border="0"/>
        <div id="form_container">
        <form id="form" onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <label>
                Attending:
                <input id="checkbox1"type="checkbox" name="attending" checked={formData.attending} onChange={handleChange} />
            </label>
            <label>
                Bringing a Plus One:
                <input id="checkbox2"type="checkbox" name="plusOne" checked={formData.plusOne} onChange={handleChange} />
            </label>
            
            <label>
                Are you Able to Bring a Specific Food Item from the Above List?
                <input id="checkbox3"type="checkbox" name="isBringingSpecFood" checked={formData.isBringingSpecFood} onChange={handleChange} />
            </label>

            
            {formData.isBringingSpecFood ? (<div><label htmlFor="myDropdown">Choose an option:</label>
            <select id="myDropdown" name="foodOption" onChange={handleChange} value={formData.foodOption}>
            {sharedValue.appetizer == 0 ? (<option disabled={true} value="Appetizer">Appetizer</option>) : (<option value="Appetizer">Appetizer</option>)}
            {sharedValue.sideDish == 0 ? (<option disabled={true} value="Side Dish">Side Dish</option>) : (<option value="Side Dish">Side Dish</option>)}
            {sharedValue.mainDish === 0 ? (<option disabled={true} value="Main Dish">Main Dish</option>) : (<option value="Main Dish">Main Dish</option>)}
            {sharedValue.snack === 0 ? (<option disabled={true} value="Snack">Snack</option>) : (<option value="Snack">Snack</option>)}
            {sharedValue.dessert === 0 ? (<option disabled={true}value="Dessert">Dessert</option>) : (<option value="Dessert">Dessert</option>)}
            {sharedValue.bread === 0 ? (<option disabled={true} value="BREAD">BREAD</option>) : (<option value="BREAD">BREAD</option>)}
            <option value="Other">Other</option>
            </select></div>) : (<></>)} 

            <input type="text" name="songChoice" value={formData.songChoice} onChange={handleChange} placeholder="Song Choice" />
            <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} placeholder="Dietary Restrictions" />
            <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} placeholder="Leave a comment about bird you/your plus one plan on being or leave another note! (Optional)"></textarea>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button id="submitButton" type="submit">Submit</button>
        </form>
        </div>
        <img id="rsvpImage" src="ani_BlueJay1.gif" alt="birdy30-invite" border="0"/>

        
        </div>
    );
};

export default RsvpForm;
