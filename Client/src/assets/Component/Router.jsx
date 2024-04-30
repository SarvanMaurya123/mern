import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Footer from './Footer';
import Header from './Header';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Login from '../Pages/Login';
import SignUp from '../Pages/Signup';
import Logout from '../Pages/Logout';
import ForgotPassword from '../Pages/ForgatPassword';
import ResetPassword from '../Pages/ResetPasswoed';
import ConfirmationPage from '../Pages/ConfirmationPage';
import UserProfile from "../Pages/UserProfile"

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Include the token parameter for ResetPassword route */}
                <Route path="/confirm-password/:token" element={<ResetPassword />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/UserProfile" element={<UserProfile />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
