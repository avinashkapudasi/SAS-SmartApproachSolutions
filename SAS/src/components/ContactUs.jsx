// import React from 'react';
// import { MapPin, Phone, Mail, Clock } from 'lucide-react';
// import styles from '../css/ContactUs.module.css';
// import contactData from '../assets/data/contactDetails.json';
// import { ContactDetails } from '../types/ContactDetails';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from '../css/ContactUs.module.css';
import contactData from '../assets/data/contactDetails.json';
import { ContactDetails } from '../types/ContactDetails';
import Loader from './Common/Loader/Loader';


const ContactUs = () => {
//   const contactDetails = ContactDetails.fromJSON(contactData);
//   const primaryContact = contactDetails.getPrimaryContact();


  const [isLoading, setIsLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState(null);
  const [primaryContact, setPrimaryContact] = useState(null);

  useEffect(() => {
    const loadContactDetails = async () => {
      try {
        const details = ContactDetails.fromJSON(contactData);
        setContactDetails(details);
        setPrimaryContact(details.getPrimaryContact());
      } catch (error) {
        console.error('Error loading contact details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContactDetails();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size={40} />
      </div>
    );
  }

  return (
    <div className={styles.contactContainer}>
      <h1>Contact Us</h1>
      <p className={styles.subtitle}>Get in touch with us</p>

      <div className={styles.contactGrid}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <MapPin size={24} />
            <div>
              <h3>Our Location</h3>
              <p>{contactDetails.getFullAddress()}</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <Mail size={24} />
            <div>
              <h3>Email Us</h3>
              <a href={`mailto:${primaryContact.email}`}>{primaryContact.email}</a>
              {contactDetails.email.support && (
                <p className={styles.secondaryContact}>
                  Support: <a href={`mailto:${contactDetails.email.support}`}>{contactDetails.email.support}</a>
                </p>
              )}
            </div>
          </div>

          <div className={styles.infoCard}>
            <Phone size={24} />
            <div>
              <h3>Call Us</h3>
              <a href={`tel:${primaryContact.phone}`}>{primaryContact.phone}</a>
              {contactDetails.phone.secondary && (
                <p className={styles.secondaryContact}>
                  Alternative: <a href={`tel:${contactDetails.phone.secondary}`}>{contactDetails.phone.secondary}</a>
                </p>
              )}
            </div>
          </div>

          <div className={styles.infoCard}>
            <Clock size={24} />
            <div>
              <h3>Working Hours</h3>
              <p>{contactDetails.getWorkingSchedule()}</p>
            </div>
          </div>
        </div>

        <div className={styles.mapContainer}>
        {mapLoading && (
            <div className={styles.mapLoader}>
              <Loader size={40} />
            </div>
          )}
          <iframe
            src={contactDetails.mapLocation}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
            onLoad={() => setMapLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;