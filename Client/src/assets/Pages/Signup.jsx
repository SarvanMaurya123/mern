import React, { useState } from 'react';
import styles from '../Pages/Signup.module.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../ContextApi/ContApi'; // Import useAuth hook
import { NavLink } from "react-router-dom";
import { BACKEND } from '../../Url';
const SignUp = () => {
    const { isLoggedIn, user } = useAuth(); // Get isLoggedIn state from the authentication context
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        tel: '',
        agree: false
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'tel' ? String(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BACKEND}/Api/v1/User/RagisterUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Sign up successful');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    tel: '',
                    agree: false
                });
                navigate("/Login")
            } else if (response.status === 400) {
                setError('Username & Email Already exist. Please Login');
                setTimeout(() => setError(null), 60000);
            } else {
                const responseData = await response.json();
                console.error('Sign up failed:', responseData.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <section className={styles.headersectionsignup}>
            <div className={styles.signupForm2}>
                <h2>Sign Up</h2>
                {isLoggedIn && (
                    <div className={styles.allreadyloginuser}>
                        <p>Username & Email Already exist. Please log now</p>
                    </div>
                )}
                {!isLoggedIn && (
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className={styles.errormessage}>
                                <p>{error}</p>
                            </div>
                        )}
                        <div>
                            <label htmlFor="username">Name:</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder='Name' required />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required />
                        </div>
                        <div>
                            <label htmlFor="tel">Phone:</label>
                            <input type="tel" id="tel" name="tel" value={formData.tel} onChange={handleChange} placeholder='Phone Number' required />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' required />
                        </div>
                        <div className={styles.checkboxitem}>
                            <input type="checkbox" id="agree" name="agree" checked={formData.agree} onChange={handleChange} required />
                            <label htmlFor="agree">I agree to the terms and conditions</label>
                        </div>
                        <div>
                            <button type="submit">Sign Up</button>
                        </div>
                        <div>
                            <p>Already signed up. Please login? <NavLink to="/login">Login</NavLink></p>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}

export default SignUp;
