import React from 'react';
import classNames from 'tailwindcss-classnames';
import styles from './Checkbox.module.css';

const Checkbox = React.forwardRef(
  (
    {
      id,
      name,
      label,
      checked,
      optional = false,
      disabled = false,
      onChange,
      value,
      containerClassName,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      onChange(e);
    };
    return (
      <div className={containerClassName}>
        <label className={styles.container} htmlFor={id ?? name}>
          {label && (
            <span
              className={classNames(styles.label, disabled && styles.disabled)}
            >
              {label} {!optional && <span className={styles.required}>*</span>}
            </span>
          )}
          <input
            id={id ?? name}
            type="checkbox"
            name={name}
            className={styles.checkbox}
            disabled={disabled}
            checked={checked}
            value={value ?? true}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === '') {
                handleChange({
                  ...e,
                  target: {
                    checked: !checked,
                  },
                });
              }
            }}
            ref={ref}
            {...inputProps}
          />
          <span
            className={classNames(
              styles.checkmark,
              disabled && styles.disabled
            )}
          ></span>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
