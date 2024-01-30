import React from 'react';
import dayjs from 'dayjs';

import styles from './Footer.module.css';

// import { upcLogoWhite } from 'src/assets/img';
import Button from '../Button';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider}>
        <div className={styles.text}>
          <div className={styles.heading}>Questions?</div>
          <div className={styles.heading}>
            Call Us{' '}
            <a href="tel:888-256-3378" className={styles.phone}>
              (888) 256-3378
            </a>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            color="water"
            variant="small"
            id="visit-website-button"
            href="https://www.upcinsurance.com"
            target="_blank"
          >
            Visit our Website
          </Button>
          <Button
            className={styles.button}
            color="water"
            variant="small"
            id="privacy-button"
            href="https://www.upcinsurance.com/privacy"
            target="_blank"
          >
            Privacy Notice
          </Button>
        </div>
        <div className={styles.message}>
          Content provided is intended for general informational purposes only.
          Any changes made to your policy may not be immediately reflected here.
          Please refer to your insurance policy for coverages, exclusions, and
          limitations.
        </div>
      </div>
      <div className={styles.logo}>
        <a href="https://www.upcinsurance.com/">
          {/* <img
            src={upcLogoWhite}
            alt="UPC Insurance logo"
            id="logo"
            className={styles.logoContainer}
          /> */}
        </a>
        <p className={styles.copy}>
          © {dayjs().year()}, UPC Insurance. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
