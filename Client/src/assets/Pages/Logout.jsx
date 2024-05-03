import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextApi/ContApi';
import axios from 'axios';
import styles from "../Component/Header.module.css";
import { BACKEND } from '../../Url';
const Logout = () => {
    const navigate = useNavigate();
    const { token, logout } = useAuth(); // Assuming you have a token stored in your auth context

    const handleLogout = async () => {
        try {
            await axios.post(
                `${BACKEND}/Api/v1/Logout/LogoutUser`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            localStorage.removeItem('token');
            logout();
            navigate("/login");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
