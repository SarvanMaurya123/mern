import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/v1/forgot-password`, {
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
    );
};

export default ForgetPassword;
