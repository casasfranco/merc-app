import React from 'react';

import { Viewport, CardContainer } from '../../components';
import styles from './Page.module.css';
import classnames from 'tailwindcss-classnames';

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
        <h1>{title}</h1>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {/* )} */}
    </div>
    {children}
  </Viewport>
);

const Section = ({ title, children, cardStyle, className }) => (
  <div className={classnames(styles.sectionContainer, className)}>
    {title && <h2 className={styles.titleContainer}>{title}</h2>}
    <CardContainer card={cardStyle}>{children}</CardContainer>
  </div>
);

const Buttons = ({ children }) => (
  <div className={styles.buttons}>{children}</div>
);

Page.Section = Section;
Page.Buttons = Buttons;

export default Page;
