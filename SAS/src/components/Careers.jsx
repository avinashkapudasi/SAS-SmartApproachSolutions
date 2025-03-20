import React, { useState } from 'react';
import ApplicationModal from './ApplicationModal';
import jobListingsData from '../assets/data/jobListings.json';
import { JobListing } from '../types/JobListing';
import styles from '../css/Careers.module.css';

const Careers = () => {
  const [showForm, setShowForm] = useState(null);
  const jobListings = JobListing.fromJSONArray(jobListingsData.jobs);

  const handleApply = (formUrl) => {
    setShowForm(formUrl);
  };

  return (
    <div className={styles.careersContainer}>
      <h1>Careers</h1>
      <p className={styles.subtitle}>Join our team and be part of something great!</p>
      
      <div className={styles.jobListingsGrid}>
        {jobListings.map((job, index) => (
          <div className={styles.jobCard} key={index}>
            <div className={styles.cardContent}>
              <h2>{job.title}</h2>
              <p className={styles.description}>{job.description}</p>
              <div className={styles.requirements}>
                <h3>Requirements:</h3>
                <ul>
                  {job.requirements.map((req, reqIndex) => (
                    <li key={reqIndex}>{req}</li>
                  ))}
                </ul>
              </div>
              <button 
                className={styles.applyBtn}
                onClick={() => handleApply(job.formUrl)}
              >
                Apply Now
              </button>
            </div>
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