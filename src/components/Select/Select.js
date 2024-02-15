import React, { useLayoutEffect, useRef, useState } from 'react';
import classNames from 'tailwindcss-classnames';
import styles from './Select.module.css';

import { Icon } from '../../components';

const Select = React.forwardRef(
  (
    {
      success = false,
      error,
      options,
      name,
      disabled = false,
      id,
      onChange,
      label,
      value,
      placeholder,
      className,
      optional = false,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] = useState(false);
    const selectRef = useRef(null);

    useLayoutEffect(() => {
      if (selectRef.current) {
        setSelected(!!selectRef.current.value);
      }
    }, []);

    const handleSelect = (e) => {
      setSelected(!!e.target.value);
      onChange(e);
    };

    return (
      <div className={styles.relativeContent}>
        <div className={styles.container}>
          {!selected && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          <Icon
            aria-hidden
            alt="Toggle selected"
            name="chevronDown"
            color="warm-gray"
            size={12}
            className={styles.icon}
          />
        </div>
        <div className={styles.selectContent}>
          {label && (
            <label htmlFor={id ?? name} className={styles.label}>
              {label} {!optional && <span className={styles.required}>*</span>}
            </label>
          )}
          <select
            id={id ?? name}
            ref={(r) => {
              ref(r);
              selectRef.current = r;
            }}
            name={name}
            value={value}
            defaultValue=""
            disabled={disabled}
            className={classNames(
              styles.select,
              className,
              error && styles.error,
              disabled && styles.disabled,
              success && styles.success
            )}
            required={!optional}
            onChange={handleSelect}
            onBlur={handleSelect}
            aria-invalid={error ? 'true' : 'false'}
            {...(error && { 'aria-describedby': `${id ?? name}-error` })}
            {...props}
          >
            <option disabled value="" />
            {options &&
              options.map((item) => (
                <option key={item.id} name={item.title} value={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
          {error && (
            <div className={styles.errorContainer}>
              <span id={`${id ?? name}-error`} className={styles.errorText}>
                {error}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = `Select`;

export default Select;
