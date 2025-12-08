import RsvpForm from './RsvpForm.jsx';
import BirthdayBanner from './BirthdayBanner.jsx';
import Rats from './Rats.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';

const PasswordPage = ({ onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Access Restricted</h1>
      <p>Please enter the secret password to view the invitation.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};


const App = () => {
  
  const [sharedValue, setSharedValue] = useState({
    appetizer: 3, mainDish: 3, sideDish: 3, desserts: 2, 
    snacks: 2, bread: 1, other: 0
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateSharedValue = (newValue) => {
    setSharedValue(newValue);
  };

  const handlePasswordSubmit = async (password) => {

    try {

      const response = await axios.post('http://localhost:3000/validate-password', { submittedPassword: password });

      if (response.status === 200) {
        setIsAuthenticated(true);
        sessionStorage.setItem('event_auth', 'true'); 

      } else {
        alert('Incorrect password. Please try again.');
      }

    } catch (error) {
      console.error('Network error validating password:', error);
      alert('Could not connect to the server to verify password.');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('event_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);



  if (!isAuthenticated) {
    return <PasswordPage onSubmit={handlePasswordSubmit} />;
  }

  return (
    <>
      <BirthdayBanner sharedValue={sharedValue} updateSharedValue={updateSharedValue} />
      <RsvpForm sharedValue={sharedValue} password={sessionStorage.getItem('event_auth_password')} /> 
      <Rats />
    </>
  );
};

export default App;
