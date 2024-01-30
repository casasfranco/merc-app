import React from 'react';
import classNames from 'tailwindcss-classnames';
import styles from './Input.module.css';

const Input = React.forwardRef(
  (
    {
      name,
      id,
      label,
      error,
      optional = false,
      disabled = false,
      success = false,
      containerClassName,
      ...props
    },
    ref
  ) => (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id ?? name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id ?? name}
        name={name}
        className={classNames(
          styles.input,
          error && styles.error,
          disabled && styles.disabled,
          success && styles.success
        )}
        disabled={disabled}
        required={!optional}
        aria-invalid={error ? 'true' : 'false'}
        {...(error && { 'aria-describedby': `${id ?? name}-error` })}
        {...props}
      />
      <div className={styles.errorContainer}>
        {error && (
          <span id={`${id ?? name}-error`} className={styles.errorText}>
            {error}
          </span>
        )}
      </div>
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
