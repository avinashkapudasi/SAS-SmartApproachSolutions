import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Careers from './components/Careers'
import ContactUs from './components/ContactUs'
import Loader from './components/Common/Loader/Loader'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <section id="home">
              <h2>Home</h2>
              <p>Welcome to our website!</p>
            </section>
            <section id="about">
              <h2>About Us</h2>
              <p>Learn more about our company.</p>
            </section>
            <section id="services">
              <h2>Services</h2>
              <p>Discover the services we offer.</p>
            </section>
            <section id="testimonials">
              <h2>Testimonials</h2>
              <p>Read what our clients have to say.</p>
            </section>
            <section id="Careers">
              <h2>Careers</h2>
              <p>Check out our careers to join us.</p>
            </section>
            <section id="team">
              <h2>Our Team</h2>
              <p>Meet our dedicated team members.</p>
            </section>
            <section id="contact">
              <h2>Contact Us</h2>
              <p>Get in touch with us.</p>
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


      </Routes>
      
    </Router>
  )
}

export default App
