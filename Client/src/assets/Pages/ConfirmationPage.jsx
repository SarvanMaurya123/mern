// ConfirmationPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Pages/Home.module.css';
const ConfirmationPage = () => {
    const [countdown, setCountdown] = useState(120);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount === 1) {
                    clearInterval(timer);
                    navigate('/login');
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <section className={styles.headersection}>
            <img src="/Programing.jpg" alt="Programming" />
            <div className={styles.confirmationcontainer}>
                <h2>Password Reset Email Sent</h2>
                <p>Please check your email for further instructions.</p>
                <p className="countdown-message">Redirecting to login page in {countdown} seconds...</p>
                <Link to="/login" className="countdown-link">Go to Login</Link>
            </div>
        </section>
    );
};

export default ConfirmationPage;
