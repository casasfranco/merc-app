import React from 'react';

import styles from './Form.module.css';

const Form = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit && props.onSubmit(e);
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      onChange={props.onChange}
      noValidate
    >
      {props.children}
      <input type="submit" className="invisible absolute h-0" />
    </form>
  );
};

const Row = ({ children }) => <div className={styles.row}>{children}</div>;

const Col = ({ children }) => <div className={styles.col}>{children}</div>;

Form.Row = Row;
Form.Col = Col;

export default Form;
