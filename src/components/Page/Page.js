import React from 'react';

import { Viewport, CardContainer } from '../../components';
import styles from './Page.module.css';

const Page = ({ title, subtitle, children }) => (
  <Viewport>
    <div className={styles.container}>
      {/* {stage ? (
        <div className={styles.stageContainer}>
          <ProgressBar stage={stage} />
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
      ) : ( */}
      <div className={styles.titleContainer}>
        <h1 className>{title}</h1>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {/* )} */}
    </div>
    {children}
  </Viewport>
);

const Section = ({ title, children, noCardStyle }) => (
  <div className={styles.sectionContainer}>
    {title && <h2 className={styles.titleContainer}>{title}</h2>}
    <CardContainer card={noCardStyle ? false : undefined}>
      {children}
    </CardContainer>
  </div>
);

const Buttons = ({ children }) => (
  <div className={styles.buttons}>{children}</div>
);

Page.Section = Section;
Page.Buttons = Buttons;

export default Page;
