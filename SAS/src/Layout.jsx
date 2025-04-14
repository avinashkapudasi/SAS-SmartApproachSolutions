/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Layout.css';
import Logo from './assets/SAPPSS.png'; // Import logo image

const Layout = ({ children }) => {
  const [isInHomeSection, setIsInHomeSection] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add state for mobile menu
  const scrollTimerRef = useRef(null);
  const navRef = useRef(null);
  const toggleBtnRef = useRef(null); // Add ref for toggle button
  const location = useLocation();
  const isMobile = useRef(window.innerWidth <= 768);

  // Check if we're on mobile
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
      if (!isMobile.current) {
        setIsMobileMenuOpen(false); // Close mobile menu if resized to desktop
      }
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
  }, []);

  // Handle scroll detection for home section
  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timer
      const scrollTimer = scrollTimerRef.current;
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      // Check if we're in the home section
      const homeSection = document.getElementById('home');
      const aboutSection = document.getElementById('about');
      
      if (homeSection && aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const isAboutVisible = aboutRect.top <= window.innerHeight * 0.9;
        setIsInHomeSection(!isAboutVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && 
          navRef.current && 
          toggleBtnRef.current && 
          !navRef.current.contains(event.target) && 
          !toggleBtnRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    setIsMobileMenuOpen(false);
    
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
          <div className="logo-container">
              <img 
                src={Logo}
                alt="SAS Logo" 
                className="header-logo"
              />
          </div>
          {/* Desktop navigation */}
          <nav className="desktop-nav">
            <ul>
              <li><a onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
              <li><a onClick={(e) => scrollToSection(e, 'about')}>About Us</a></li>
              <li><a onClick={(e) => scrollToSection(e, 'services')}>Services</a></li>
              <li><a onClick={(e) => scrollToSection(e, 'team')}>Our Team</a></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><a onClick={(e) => scrollToSection(e, 'contact')}>Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Mobile toggle button - Don't use inline styles that override CSS media queries */}
      <button 
        ref={toggleBtnRef}
        className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {/* Mobile side navigation */}
      <nav 
        ref={navRef} 
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
      >
        <ul>
          <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</a></li>
          <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a></li>
          <li><a href="#team" onClick={(e) => scrollToSection(e, 'team')}>Our Team</a></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact Us</a></li>
        </ul>
      </nav>
      
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
