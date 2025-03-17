import React, { useState } from 'react';
import ApplicationModal from './ApplicationModal';
import jobListingsData from '../assets/data/jobListings.json';
import { JobListing } from '../types/JobListing';

const Careers = () => {
  const [showForm, setShowForm] = useState(null);
  const jobListings = JobListing.fromJSONArray(jobListingsData.jobs);

  const handleApply = (formUrl) => {
    setShowForm(formUrl);
  };

  return (
    <div className="careers-container">
      <h1>Careers</h1>
      <p>Join our team and be part of something great!</p>
      
      <div className="job-listings">
        {jobListings.map((job, index) => (
          <div className="job-card" key={index}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <ul>
              {job.requirements.map((req, reqIndex) => (
                <li key={reqIndex}>{req}</li>
              ))}
            </ul>
            <button 
              className="apply-btn" 
              onClick={() => handleApply(job.formUrl)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <ApplicationModal 
          formUrl={showForm} 
          onClose={() => setShowForm(null)} 
        />
      )}
    </div>
  );
};

export default Careers;