import { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Careers from './components/Careers'
import homeImage from './assets/home.jpeg' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeadset, faChartLine, faGlobe, faCogs, 
  faPhone, faEnvelope, faCommentDots, faHashtag, 
  faVideo, faSms 
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ContactUs from './components/ContactUs'
import Loader from './components/Common/Loader/Loader'
import { TeamMember } from './types/TeamMember';
import teamData from './assets/data/teamMembers.json'


function App() {
  useEffect(() => {
    document.title = "Smart Approach Solutions";
  }, []);

  const teamMembers = TeamMember.fromJSONArray(teamData.team);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <section id="home" className="home-section">
              <img 
                src={homeImage} 
                alt="Home Background" 
                className="home-background-image" 
              />
              <div className="home-content">
                <h1>Welcome to SAS</h1>
              </div>
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
                <div className="service-block">
                  <div className="service-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <h3>Voice Support</h3>
                  <p>Traditional call centers handling inbound/outbound calls with professionally trained agents.</p>
                </div>
                
                <div className="service-block">
                  <div className="service-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <h3>Email Management</h3>
                  <p>Response to customer inquiries via email with tailored solutions and prompt turnaround times.</p>
                </div>
                
                <div className="service-block">
                  <div className="service-icon">
                    <FontAwesomeIcon icon={faCommentDots} />
                  </div>
                  <h3>Live Chat</h3>
                  <p>Real-time text-based support on websites/apps providing immediate assistance to customers.</p>
                </div>
                
                <div className="service-block">
                  <div className="service-icon">
                    <FontAwesomeIcon icon={faHashtag} />
                  </div>
                  <h3>Social Media</h3>
                  <p>Monitoring and responding to queries on platforms like Facebook, Twitter to enhance brand presence.</p>
                </div>
                
                <div className="service-block">
                  <div className="service-icon">
                    <FontAwesomeIcon icon={faVideo} />
                  </div>
                  <h3>Video Support</h3>
                  <p>Face-to-face virtual assistance for more personalized customer support experiences.</p>
                </div>
                
                <div className="service-block">
                  <div className="service-icon">
                    <FontAwesomeIcon icon={faSms} />
                  </div>
                  <h3>SMS/Text</h3>
                  <p>Mobile messaging support for quick queries and updates, designed for on-the-go customers.</p>
                </div>
              </div>
            </section>
            <section id="team">
              <h2>Our Team</h2>
              <p>Meet our dedicated team members who make everything possible.</p>
             
              <div className="team-grid">
                  {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
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
