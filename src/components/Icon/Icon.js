import React from 'react';
import classnames from 'tailwindcss-classnames';

import * as icons from '../../assets/icon';
import styles from './Icon.module.css';

const Icon = ({
  name = '',
  size,
  color = 'navy',
  className,
  disabled,
  ...props
}) => {
  const Component = icons[name];
  if (!Component) {
    return <span data-testid="no-icon" />;
  }
  return (
    <Component
      className={classnames(
        styles.icon,
        !disabled && {
          'text-navy': color === 'navy',
          'text-water': color === 'water',
          'text-white': color === 'white',
          'text-black': color === 'black',
          'text-warm-gray': color === 'warm-gray',
          'text-success': color === 'success',
          'text-error': color === 'error',
        },
        disabled && styles.disabled,
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      focusable="false"
      {...props}
    />
  );
};

export default Icon;
