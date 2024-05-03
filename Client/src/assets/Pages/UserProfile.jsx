import { useState, useEffect } from 'react';
import styles from '../Component/Header.module.css';
import { useAuth } from '../ContextApi/ContApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND } from '../../Url';
const UserProfile = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState({ username: '', email: '', tel: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserData({
                username: user.username || '',
                email: user.email || '',
                tel: user.tel || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${BACKEND}/Api/v1/UpdateProfile/user`;
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
            const response = await axios.put(url, {
                username: userData.username,
                email: userData.email,
                tel: userData.tel
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.data || !response.data._id) {
                throw new Error(response.data?.message || 'Update failed');
            }

            setSuccessMessage('User profile updated successfully');
            setErrorMessage('');
            setUserData({ // Reset form data
                username: response.data.username,
                email: response.data.email,
                tel: response.data.tel
            });
            setTimeout(() => {
                navigate('/')
            }, 10000); // 10 seconde navigate for home page
        } catch (error) {
            console.error('Error updating user profile:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            setSuccessMessage('');
            setErrorMessage(error.message);
        }
    };


    return (
        <div className={styles.UserProfile}>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="tel"
                        value={userData.tel}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        </div>
    );
};

export default UserProfile;
