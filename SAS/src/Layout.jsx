import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Removed unused isScrolled state
  const [isInHomeSection, setIsInHomeSection] = useState(true); // Add state for home section
  const scrollTimerRef = useRef(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();
  const isMobile = useRef(window.innerWidth <= 768);

  // Check if we're on mobile
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add header height measurement on initial render
  useEffect(() => {
    // Measure header height and set it as a CSS variable
    const header = document.querySelector('header');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
    
    // Existing code for handleScroll...
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      // Check if we're in the home section - now for all devices, not just mobile
      const homeSection = document.getElementById('home');
      const aboutSection = document.getElementById('about');
      
      if (homeSection && aboutSection) {
        // Get the position of the about section relative to the viewport
        const aboutRect = aboutSection.getBoundingClientRect();
        // If the top of about section is close to entering the viewport, show the header
        const isAboutVisible = aboutRect.top <= window.innerHeight * 0.9;
        
        // We're in the home section if we've not yet reached the about section
        setIsInHomeSection(!isAboutVisible);
      }
      
      // Set a new timer to hide the toggle after 2 seconds of no scrolling
      scrollTimerRef.current = setTimeout(() => {
        if (!isMenuOpen) {
          // Removed unused setIsScrolled
        }
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Run once to set initial state
    handleScroll();
    
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
      // Removed unused setIsScrolled
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
      <header className={isInHomeSection ? 'hide-header' : ''}>
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
      
      {/* Fixed toggle button that disappears completely when nav is active */}
      <div 
        ref={toggleRef}
        className={`mobile-toggle ${isMenuOpen ? 'hide' : ''} ${isInHomeSection ? 'in-home' : ''}`}
        style={{ display: isMenuOpen ? 'none' : 'flex' }} /* Added inline style for immediate response */
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
          <p>© Copyright 2025 Prime | All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
