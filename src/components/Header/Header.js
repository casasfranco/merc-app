import React from 'react';
import styles from './Header.module.css';
// import { upcLogo } from 'src/assets/img';
// import NavActions from './NavActions';
// import { useFeatureFlags } from 'src/lib/hooks';

const Header = () => {
  // const { enableFnolMaintenanceMode } = useFeatureFlags();
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        {/* <img
          src={upcLogo}
          alt="UPC Insurance logo"
          id="logo"
          className={styles.logo}
        /> */}
      </div>
      {/* {!enableFnolMaintenanceMode && <NavActions />} */}
    </header>
  );
};

export default Header;
