import React, { forwardRef, useRef } from 'react';
import Select, { components } from 'react-select';
import { Tooltip } from 'react-tooltip';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './SelectByGroup.module.css';

const groupStyles = {
  color: 'white',
  padding: '5px 0px',
  display: 'flex',
  alignItems: 'center',
};

const GroupHeading = ({ children, ...props }) => {
  return (
    <div style={groupStyles}>
      <components.GroupHeading {...props}>{children}</components.GroupHeading>
      <span data-tip="Custom GroupHeading Component">
        <MdKeyboardArrowDown />
      </span>
      <Tooltip place="top" type="dark" effect="solid" />
    </div>
  );
};
const SelectByGroup = forwardRef(
  (
    {
      error,
      options,
      name,
      disabled = false,
      optional = false,
      id,
      onChange,
      label,
      value,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const selectRef = useRef(ref);

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
      }),
      // Aquí puedes añadir más estilos personalizados
    };

    return (
      <div className={className}>
        {label && (
          <label htmlFor={id ?? name}>
            {label}
            {!optional && <span className={styles.required}>*</span>}
          </label>
        )}
        <Select
          id={id ?? name}
          ref={selectRef}
          isDisabled={disabled}
          options={options}
          defaultValue={
            value ? options.find((option) => option.value === value) : undefined
          }
          onChange={handleChange}
          classNamePrefix="select"
          components={{ GroupHeading }}
          styles={customStyles}
          placeholder={placeholder}
          required={optional}
          {...props}
        />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);

SelectByGroup.displayName = 'SelectByGroup';

export default SelectByGroup;
