import { useEffect, useState, useRef } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Careers from './components/Careers'
import homeImage from './assets/home.jpeg' 
import homeImage2 from './assets/home2.jpeg' // Import second background image
import homeImage3 from './assets/home3.jpeg' // Import third background image
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeadset, faChartLine, faCogs, 
  faPhone, faEnvelope, faCommentDots, faHashtag, 
  faVideo, faSms, 
  faUsers, 
  faGears, 
  faGlobe, 
  faRobot, 
  faGraduationCap,
  faChevronLeft,
  faChevronRight  
} from '@fortawesome/free-solid-svg-icons';//adding for deployment
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ContactUs from './components/ContactUs'
import Loader from './components/Common/Loader/Loader'
import { TeamMember } from './types/TeamMember';
import teamData from './assets/data/teamMembers.json'
import servicesData from './assets/data/serviceData.json'
import { Service } from './types/ServiceDetails';


function App() {
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const autoScrollInterval = useRef(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0); // Track current background image
  const backgroundImages = [homeImage, homeImage2, homeImage3]; // Array of background images
  const bgTransitionTimer = useRef(null);

  useEffect(() => {
    document.title = "Smart Approach Solutions";
  }, []);

  const teamMembers = TeamMember.fromJSONArray(teamData.team);
  const services = Service.fromJSONArray(servicesData.services);

  // Set up carousel auto-scroll
  useEffect(() => {
    if (!teamMembers || teamMembers.length <= 1) return;
    
    const scroll = () => {
      setCurrentTeamMember(prev => (prev + 1) % teamMembers.length);
    };
    
    // Start auto-scrolling
    autoScrollInterval.current = setInterval(scroll, 5000);
    
    // Clean up interval on unmount
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [teamMembers]);

  // Background image rotation
  useEffect(() => {
    // Set up timer to change background image every 8 seconds
    bgTransitionTimer.current = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    
    // Clean up on unmount
    return () => {
      if (bgTransitionTimer.current) {
        clearInterval(bgTransitionTimer.current);
      }
    };
  }, [backgroundImages.length]);
  
  // Handle carousel navigation
  const navigateCarousel = (direction) => {
    // Reset the auto-scroll timer when manually navigating
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    if (direction === 'prev') {
      setCurrentTeamMember(prev => (prev === 0 ? teamMembers.length - 1 : prev - 1));
    } else {
      setCurrentTeamMember(prev => (prev + 1) % teamMembers.length);
    }
    
    // Restart auto-scroll
    autoScrollInterval.current = setInterval(() => {
      setCurrentTeamMember(prev => (prev + 1) % teamMembers.length);
    }, 5000);
  };
  
  // Jump to specific team member
  const jumpToTeamMember = (index) => {
    // Reset the auto-scroll timer
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    setCurrentTeamMember(index);
    
    // Restart auto-scroll
    autoScrollInterval.current = setInterval(() => {
      setCurrentTeamMember(prev => (prev + 1) % teamMembers.length);
    }, 5000);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <section id="home" className="home-section">
              {/* Background image carousel */}
              <div className="bg-carousel">
                {backgroundImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Home Background ${index + 1}`} 
                    className={`home-background-image ${index === currentBgIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
              {/* <div className="home-content">
                
              </div> */}
            </section>
            <section id="about">
              <h2>About Us</h2>
              <p>Learn more about what we does the best in our Organisation.</p>
              
              <div className="about-blocks">
                <div className="about-block">
                  <div className="block-icon">
                    <FontAwesomeIcon icon={faHeadset} />
                  </div>
                  <h3>24/7 Customer Support</h3>
                  <p>We provide round-the-clock customer support services to ensure your customers always have assistance when they need it.</p>
                </div>
                
                <div className="about-block">
                  <div className="block-icon">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                  <h3>Performance Metrics</h3>
                  <p>Our data-driven approach ensures high-quality service delivery with measurable results and continuous improvement.</p>
                </div>
                
                <div className="about-block">
                  <div className="block-icon">
                    <FontAwesomeIcon icon={faGlobe} />
                  </div>
                  <h3>Multilingual Support</h3>
                  <p>Our diverse team offers support in multiple languages to help you expand your business globally with local expertise.</p>
                </div>
                
                <div className="about-block">
                  <div className="block-icon">
                    <FontAwesomeIcon icon={faCogs} />
                  </div>
                  <h3>Customized Solutions</h3>
                  <p>We tailor our services to meet your specific business requirements, ensuring optimal customer satisfaction and retention.</p>
                </div>
              </div>
            </section>
            <section id="services">
                <h2>Services</h2>
                <p>Discover our comprehensive customer support services.</p>
                
                <div className="services-grid">
                  {services.map((service) => (
                    <div className="service-block" key={service.id}>
                      <div className="service-icon">
                        <FontAwesomeIcon icon={eval(service.icon)} />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            <section id="team">
              <h2>Our Team</h2>
              <p>Meet our dedicated team members who make everything possible.</p>
             
              <div className="team-carousel-container">
                {/* <button 
                  className="carousel-btn prev-btn" 
                  aria-label="Previous team member"
                  onClick={() => navigateCarousel('prev')}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button> */}
                
                <div className="team-carousel">
                  <div 
                    className="team-carousel-inner" 
                    style={{ transform: `translateX(-${currentTeamMember * 100}%)` }}
                  >
                    {teamMembers.map((member, index) => (
                      <div className="team-card" key={index}>
                        <div className="member-image">
                          <img src={member.image} alt={member.name} />
                        </div>
                        <h3>{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        <p className="member-desc">{member.description}</p>
                        <div className="member-social">
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                          </a>
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* <button 
                  className="carousel-btn next-btn" 
                  aria-label="Next team member"
                  onClick={() => navigateCarousel('next')}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button> */}
              </div>
              
              <div className="carousel-indicators">
                {teamMembers.map((_, index) => (
                  <button 
                    key={index}
                    className={`carousel-indicator ${currentTeamMember === index ? 'active' : ''}`}
                    aria-label={`Go to team member ${index + 1}`}
                    onClick={() => jumpToTeamMember(index)}
                  />
                ))}
              </div>
            </section>
            <section id="contact">
              <h2>Contact Us</h2>
              <ContactUs />
            </section>
          </Layout>
        } />
        <Route path="/careers" element={
          <Layout>
            <Careers />
          </Layout>
        } />
        
    <Route path="/contact" element={
          <Layout>
           <ContactUs />
          </Layout>
        } />
        
        <Route path="/career" element={<Navigate to="/careers" replace />} />
      </Routes>
      
    </Router>
  )
}

export default App
