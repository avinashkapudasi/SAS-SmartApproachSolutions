import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimerRef = useRef(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();

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

  // Handle smooth scrolling to sections with improved performance
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    // If we're not on home page, navigate there first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Close mobile menu
    setIsMenuOpen(false);
    
    // Immediate execution for better responsiveness - reduced delay
    const section = document.getElementById(sectionId);
    if (section) {
      // Get header height to adjust scroll position
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      
      // Check if we're on mobile
      const isMobile = window.innerWidth <= 768;
      // Add extra offset for mobile to account for the header height differences
      const mobileOffset = isMobile ? 20 : 0;
      
      const targetPosition = section.offsetTop - headerHeight - mobileOffset;
      
      // Simplified, more performant animation
      const duration = 400; // Reduce duration for snappier scrolling
      const startPosition = window.scrollY || window.pageYOffset;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();
      
      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple easeOutQuad for better performance
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Update URL without page reload
          window.history.pushState(null, '', `#${sectionId}`);
        }
      }
      
      window.requestAnimationFrame(step);
    }
  };

  // Scroll to section on page load if URL has hash
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const sectionId = location.hash.substring(1); // Remove the # character
      
      // Small timeout to ensure DOM is fully loaded
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          
          const targetPosition = section.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="layout">
      <header>
        <div className="header-container">
          <div>
            <Link to="/">My Website</Link>
          </div>
          <nav ref={navRef} className={isMenuOpen ? 'active' : ''}>
            <ul>
              <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a></li>
              <li><a href="#team" onClick={(e) => scrollToSection(e, 'team')}>Our Team</a></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact Us</a></li>
              {/* <li><Link to="/contact">Contact Us</Link></li> */}
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Fixed toggle button on the right side */}
      <div 
        ref={toggleRef}
        className={`mobile-toggle ${isScrolled || isMenuOpen ? 'visible' : ''} ${isMenuOpen ? 'hide' : ''}`} 
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
