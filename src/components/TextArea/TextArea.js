import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'tailwindcss-classnames';
import styles from './TextArea.module.css';

const TextArea = React.forwardRef(
  (
    {
      label,
      name,
      id,
      placeholder,
      maxLength = 1000,
      rows = 4,
      optional = false,
      error,
      disabled = false,
      success = false,
      resize = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [textLength, setTextLength] = useState(0);

    const handleChange = (event) => {
      onChange(event);
      setTextLength(event.target.value?.length);
    };

    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          {label && (
            <label htmlFor={id ?? name} className={styles.label}>
              {label}
            </label>
          )}
          {maxLength && (
            <span
              className={styles.lengthText}
            >{`${textLength}/${maxLength}`}</span>
          )}
        </div>

        <TextareaAutosize
          className={classNames(
            styles.textArea,
            error && styles.error,
            disabled && styles.disabled,
            success && styles.success,
            resize && styles.textAreaResize
          )}
          ref={ref}
          id={id ?? name}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          minRows={rows}
          required={!optional}
          disabled={disabled}
          aria-label={`${label} (maximum of ${maxLength} characters)`}
          aria-invalid={error ? 'true' : 'false'}
          {...(error && { 'aria-describedby': `${id ?? name}-error` })}
          onChange={handleChange}
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
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
