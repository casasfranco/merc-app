import React from 'react';
import classNames from 'tailwindcss-classnames';

import Spinner from '../Spinner';
import styles from './Button.module.css';

const Button = ({
  onClick,
  children,
  color = 'light',
  variant = 'default',
  loading = false,
  disabled = false,
  className,
  href,
  target,
  ...buttonProps
}) => {
  const effectiveColor = disabled ? 'gray' : color;
  const buttonClassName = classNames(
    styles['button'],
    {
      [styles['color-water']]: effectiveColor === 'water',
      [styles['color-light']]: effectiveColor === 'light',
      [styles['color-navy']]: effectiveColor === 'navy',
      [styles['color-transparent']]: effectiveColor === 'transparent',
      [styles['color-disabled']]: effectiveColor === 'gray',
    },
    {
      [styles['variant-default']]: variant === 'default',
      [styles['variant-small']]: variant === 'small',
    },
    className
  );

  const content = loading ? <Spinner color={null} size="24" /> : children;

  return !href ? (
    <button
      disabled={disabled || loading}
      onClick={!loading && !disabled ? onClick : null}
      className={buttonClassName}
      {...buttonProps}
    >
      {content}
    </button>
  ) : (
    <a
      href={href}
      className={buttonClassName}
      target={target}
      onClick={onClick}
      rel={target === '_blank' ? 'noreferrer' : ''}
    >
      {content}
    </a>
  );
};

export default Button;
