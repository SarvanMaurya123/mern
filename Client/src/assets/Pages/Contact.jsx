import React from 'react';
import styles from '../Pages/Contact.module.css';

const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
                <h2>Contact Information</h2>
                <ul>
                    <li>
                        <span>Address:</span> 123 Main Street, City, State ZIP
                    </li>
                    <li>
                        <span>Email:</span> info@example.com
                    </li>
                    <li>
                        <span>Phone:</span> 123-456-7890
                    </li>
                </ul>
            </div>
            <div className={styles.contactForm}>
                <h2>Contact Us</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message"></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
