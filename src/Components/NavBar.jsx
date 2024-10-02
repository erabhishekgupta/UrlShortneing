// src/Components/NavBar.js
import React from 'react';
import '../Style.css/Navbar.css'; // Link your stylesheet

function NavBar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/">Shortly</a> {/* Clicking logo brings back to home */}
            </div>
            <ul className="nav-links">
                <li><a href="/" className="nav-link">Home</a></li>
                <li><a href="/contact" className="nav-link">Contact</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;
