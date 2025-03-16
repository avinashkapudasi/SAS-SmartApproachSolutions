import React from 'react';

const Careers = () => {
  return (
    <div className="careers-container">
      <h1>Careers</h1>
      <p>Join our team and be part of something great!</p>
      
      <div className="job-listings">
        <div className="job-card">
          <h2>Software Developer</h2>
          <p>We're looking for talented developers to join our team.</p>
          <ul>
            <li>5+ years experience with React</li>
            <li>Strong understanding of front-end technologies</li>
            <li>Experience with RESTful APIs</li>
          </ul>
          <button className="apply-btn">Apply Now</button>
        </div>
        
        <div className="job-card">
          <h2>UX Designer</h2>
          <p>Help us create beautiful and intuitive user experiences.</p>
          <ul>
            <li>3+ years experience in UX design</li>
            <li>Proficiency with design tools like Figma or Adobe XD</li>
            <li>Strong portfolio showcasing previous work</li>
          </ul>
          <button className="apply-btn">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default Careers;
