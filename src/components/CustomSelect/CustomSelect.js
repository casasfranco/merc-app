import React, { forwardRef } from 'react';
import styles from './CustomSelect.module.css';
import Select from 'react-select';

const CustomSelect = forwardRef(
  (
    {
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
    const handleChange = (selectedOption) => {
      onChange({
        target: {
          name: name,
          value: selectedOption ? selectedOption.value : '',
        },
      });
    };

    const customStyles = {
      control: (base) => ({
        ...base,
        borderColor: error ? 'red' : base.borderColor,
        // Aquí puedes añadir más estilos personalizados
      }),
      // Añade más personalizaciones según sea necesario
    };

    return (
      <div className={className}>
        {label && (
          <label htmlFor={id ?? name} className={styles.label}>
            {label} {!optional && <span className={styles.required}>*</span>}
          </label>
        )}
        <Select
          id={id ?? name}
          ref={ref}
          isRtl={disabled}
          options={options}
          defaultValue={
            (!!options && options.find((option) => option.value === value)) ||
            undefined
          }
          onChange={handleChange}
          classNamePrefix="select"
          styles={customStyles}
          placeholder={placeholder}
          {...props}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

CustomSelect.displayName = `CustomSelect`;

export default CustomSelect;
