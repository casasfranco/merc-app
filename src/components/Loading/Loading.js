import React from 'react';

import { Spinner, Viewport } from '../../components';
import styles from './Loading.module.css';

const Loading = () => (
  <Viewport>
    <div className={styles.container}>
      <Spinner color="navy" size="80" />
    </div>
  </Viewport>
);

export default Loading;
