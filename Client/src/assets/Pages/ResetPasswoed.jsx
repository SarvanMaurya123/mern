import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [tokenValid, setTokenValid] = useState(true);
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/reset-password/check/${token}`);
                if (!response.ok) {
                    setTokenValid(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setTokenValid(false);
            }
        };
        checkTokenValidity();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tokenValid) {
            setError('Invalid or expired token');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/v1/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            if (!response.ok) {
                throw new Error('Password reset failed');
            }
            const message = await response.text();
            console.log(message);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    if (!tokenValid) {
        return (
            <div className="reset-password-container">
                <h2>Invalid or Expired Token</h2>
                <p>Successfully Change Your Password Thank You</p>
            </div>
        );
    }

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter New Password' required />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Confirm Password' required />
                </div>
                <div>
                    <button type="submit" className="reset-password-button">Reset Password</button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default ResetPassword;
