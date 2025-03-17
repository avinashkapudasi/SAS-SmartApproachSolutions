import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimerRef = useRef(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  // Handle scroll events to show/hide toggle button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(true);
      
      // Clear any existing timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      // Set a new timer to hide the toggle after 4 seconds of no scrolling
      scrollTimerRef.current = setTimeout(() => {
        if (!isMenuOpen) {
          setIsScrolled(false);
        }
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          navRef.current && 
          toggleRef.current && 
          !navRef.current.contains(event.target) && 
          !toggleRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Keep toggle button visible when menu is open
    if (!isMenuOpen) {
      setIsScrolled(true);
    }
  };

  return (
    <div className="layout">
      <header>
        <div className="header-container">
          <div>
            <Link to="/">My Website</Link>
          </div>
          <nav ref={navRef} className={isMenuOpen ? 'active' : ''}>
            <ul>
              <li><a href="/#home">Home</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#services">Services</a></li>
              <li><a href="/#testimonials">Testimonials</a></li>
              <li><a href="/#team">Our Team</a></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Fixed toggle button on the right side */}
      <div 
        ref={toggleRef}
        className={`mobile-toggle ${isScrolled || isMenuOpen ? 'visible' : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <main>
        {children}
      </main>
      <footer>
        <div className="footer-info">
          <p>Email: example@example.com | Mobile: +1234567890</p>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/facebook-icon.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/twitter-icon.svg" alt="Twitter" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/linkedin-icon.svg" alt="LinkedIn" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
