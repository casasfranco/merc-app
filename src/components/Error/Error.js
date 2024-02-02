import React from 'react';
import styles from './Error.module.css';

const Error = ({ children }) => <p className={styles.text}>{children}</p>;

export default Error;
