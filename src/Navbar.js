import React, { useState } from 'react';
import Nav.js from './Nav.js'; 
import logo from './img/logo.svg'; 

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className={menuOpen ? 'nav open' : 'nav'}>
      <a href="/"><img src={logo} alt="Logo" /></a>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Services</a></li>
        <li><a href="/">Menu</a></li>
        <li><a href="/">Reservation</a></li>
        <li><a href="/">Order Online</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
