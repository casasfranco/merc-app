import React from 'react';
import { useError } from './hoc/ErrorContext';
import { Notification } from '../components';

export const GlobalErrorHandler = () => {
  const { error, showError } = useError();

  return error ? <Notification message={error} showError={showError} /> : null;
};
