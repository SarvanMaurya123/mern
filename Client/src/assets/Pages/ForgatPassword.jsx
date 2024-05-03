import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Pages/Home.module.css';
import { BACKEND } from '../../Url';
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND}/api/v1/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                navigate('/confirmation'); // Redirect to confirmation page
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Your Email is not Valid? Please Enter Corract Email');
        }
    };

    return (
        <section className={styles.headersection}>
            <img src="/Programing.jpg" alt="Programming" />
            <div className="forget-password-container">
                <h2>Forget Password</h2>
                <form onSubmit={handleSubmit} className="forget-password-form">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Email' required />
                    </div>
                    <div>
                        <button type="submit" className="send-email-button">Send Email</button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </section>
    );
};

export default ForgetPassword;
