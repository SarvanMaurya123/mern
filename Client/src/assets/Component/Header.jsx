import React, { useState } from "react";
import styles from "../Component/Header.module.css";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing icons
import { useAuth } from '../ContextApi/ContApi';
import Logout from "../Pages/Logout";

const Header = () => {
    const [isShown, setIsShown] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // State for dark mode
    const { isLoggedIn, user } = useAuth();

    const handleToggle = () => {
        setIsShown(prevState => !prevState);
    };

    const closeNavbar = () => {
        setIsShown(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // Toggle dark mode
        if (darkMode) {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
    };

    return (
        <div className={`${styles.Headersection} ${darkMode ? styles.dark : ''}`}>
            <div className={styles.LogoItem}>
                <h2>Sarvan Maurya</h2>
            </div>
            {isLoggedIn && (
                <nav className={`${styles.Navbarlinks} ${isShown ? styles.active : ''}`} onClick={closeNavbar}>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about"> About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="/UserProfile">Profile</NavLink>
                        </li>
                        {isLoggedIn && user && user.resetToken && (
                            <li>
                                <NavLink to={`/confirm-password/${user.resetToken}`}>Reset Password</NavLink>
                            </li>
                        )}
                        <li>
                            <div className={styles.userInfo}>
                                {isLoggedIn && <Logout />}
                            </div>
                        </li>
                    </ul>
                </nav>
            )}
            <div className={styles.formsection}>
                <ul>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <div className={styles.userInfo}>
                                    {user && user.email}
                                    {isLoggedIn && <Logout />}
                                </div>
                            </li>
                            <li>
                                <button className={styles.darkModeButton} onClick={toggleDarkMode}>
                                    {darkMode ? <FaSun /> : <FaMoon />}
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup">Signup</NavLink>
                            </li>
                            <li>
                                <button className={styles.darkModeButton} onClick={toggleDarkMode}>
                                    {darkMode ? <FaSun /> : <FaMoon />}
                                </button>
                            </li>
                        </>
                    )}
                </ul>
                <div onClick={handleToggle} className={`${styles.Showsection} ${isShown ? styles.active : ''}`}>
                    <span className={styles.span1}></span>
                    <span className={styles.span2}></span>
                    <span className={styles.span3}></span>
                </div>
            </div>
        </div>
    );
};

export default Header;
