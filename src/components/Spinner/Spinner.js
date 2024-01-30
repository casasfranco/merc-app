import React from 'react';
import classNames from 'tailwindcss-classnames';

import styles from './Spinner.module.css';

const Spinner = ({ id, color, size }) => (
  <svg
    id={id}
    className={classNames(styles.spinner, {
      [styles['spinner-water']]: color === 'water',
      [styles['spinner-navy']]: color === 'navy',
      [styles['spinner-white']]: color === 'white',
    })}
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 50 50"
    style={{ enableBackground: 'new 0 0 50 50' }}
    role="image"
    aria-label="Loading"
  >
    <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default Spinner;
