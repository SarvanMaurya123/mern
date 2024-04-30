import React, { useState } from 'react';
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    window.addEventListener('scroll', toggleVisibility);

    return (
        <div>
            {isVisible && (
                <div className="scrollToTopButton" onClick={scrollToTop}>
                    <BiArrowToTop className="arrow-up" />
                </div>
            )}
        </div>
    );
};

export default ScrollToTopButton;
