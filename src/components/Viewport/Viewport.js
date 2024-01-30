import React from 'react';
import styles from './Viewport.module.css';
import { Footer, Header } from '../../components';
import classnames from 'tailwindcss-classnames';

const Viewport = ({ children }) => (
  <>
    <div className={styles.bgArch}>
      <Header />
      <main
        id="main-content"
        className={classnames(styles.main, styles.center)}
      >
        {children}
      </main>
    </div>
    <Footer />
  </>
);

export default Viewport;
