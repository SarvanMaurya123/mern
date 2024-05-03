import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../ContaxtApi/Context';
import axios from 'axios';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        agree: false
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/Api/v1/LoginUser`;

            const response = await axios.post(url, formData);
            if (!response.data || !response.data.status.success) {
                throw new Error(response.data?.message || 'Login failed');
            }
            const { accessToken, loginedUser } = response.data.status;

            if (!accessToken || !loginedUser) {
                throw new Error('Access token or user data missing in response');
            }
            login({ accessToken, user: loginedUser });
            setFormData({ email: "", password: "", agree: false });
            navigate("/");
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert("Error logging in: " + error.message); // Concatenating error message
        }
    };

    return (
        <section>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter Username & Email' required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter Password' required />
                    </div>
                    <div>
                        <input type="checkbox" id="agree" name="agree" checked={formData.agree} onChange={handleChange} required />
                        <label htmlFor="agree">I agree to the terms and conditions</label>
                    </div>
                    <div>
                        <NavLink to="/forgot-password">Forgot Password?</NavLink>
                    </div>
                    <div>
                        <button type="submit">Login now</button>
                    </div>
                    <div>
                        <p>Please Signup Now  <NavLink to="/register">Signup</NavLink></p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
