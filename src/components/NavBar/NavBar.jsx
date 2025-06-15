import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';

import "./NavBar.css";
import Logo1 from "../../assets/logo1.svg";
import Menu from "../../assets/menu.svg";

function NavBar({ basketCount }) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const loggedIn = localStorage.getItem('loggedIn');

    // Screenshot function
    const takeScreenshot = () => {
    const dynamicOverlays = document.querySelectorAll('.dynamic-overlay, .some-ad-class');
    dynamicOverlays.forEach(el => (el.style.display = 'none'));

    html2canvas(document.body, { useCORS: true })
        .then(canvas => {
            const link = document.createElement('a');
            link.download = `screenshot-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();

            dynamicOverlays.forEach(el => (el.style.display = ''));
        })
        .catch(error => {
            console.error('Screenshot failed:', error);
        });
    };

    // Voice command
    useEffect(() => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
            console.log('Voice command:', command);

            if (command.includes('madrid')) {
                takeScreenshot();
            }
        };

        recognition.start();

        return () => {
            recognition.stop();
        };
    }, []);

    const toggleDropdown = () => setShowDropdown(prev => !prev);
    const closeDropdown = () => setShowDropdown(false);

    const handleSignOut = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        localStorage.setItem(`basket-${storedUser.username}`, JSON.stringify(basket));
        }

        localStorage.removeItem('loggedIn');
        localStorage.removeItem('basket');
        alert('Signed out!');
        navigate('/signin');
        closeDropdown();
    };

    const handleBasketClick = (e) => {
        if (!loggedIn) {
        e.preventDefault();
        alert("You must be signed in to view your basket.");
        }
    };

    return (
        <nav className="nav">
            <div className="navLeft">
                <Link to="/" onClick={closeDropdown}>
                    <img src={Logo1} alt="Betabuy Logo 1" />
                </Link>
            </div>

            <div className="navCenter">
                <p><Link to="/" onClick={closeDropdown}>Home</Link></p>
                <p><Link to="/store" onClick={closeDropdown}>Store</Link></p>
                <p>
                    <Link to="/basket" onClick={(e) => { handleBasketClick(e); closeDropdown(); }}>
                        Basket ({basketCount})
                    </Link>
                </p>
            </div>

            <div className="navRight">
                {loggedIn ? (
                    <button className="signOutBtn" onClick={handleSignOut}>Sign out</button>
                ) : (
                    <Link to="/signin" onClick={closeDropdown}>
                        <button className="navBtn">Sign in</button>
                    </Link>
                )}
            </div>

            <img
                className="menu"
                src={Menu}
                alt="Menu"
                onClick={toggleDropdown}
            />

            {showDropdown && (
                <div className="mobileDropdown">
                    <Link to="/" onClick={closeDropdown}>Home</Link>
                    <Link to="/store" onClick={closeDropdown}>Store</Link>
                    <Link to="/basket" onClick={(e) => { handleBasketClick(e); closeDropdown(); }}>
                        Basket ({basketCount})
                    </Link>
                    {loggedIn ? (
                        <button className="signOutBtn" onClick={handleSignOut}>Sign out</button>
                    ) : (
                        <Link to="/signin" onClick={closeDropdown}>
                            <button className="navBtn fullWidth">Sign in</button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}

export default NavBar;
