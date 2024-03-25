import dayjs from 'dayjs';
import config from '..//config';

export const validateEmail = (value) => {
  const validateEmailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return validateEmailReg.test(value);
};

export const validatePolicyNumber = (rawInput = '') => {
  const containsAlphanumericAndSpacesOnly = /^[0-9A-Za-z ]+$/.test(rawInput);
  const atLeast10Alphanumeric = rawInput.split(' ').join('').length >= 10;
  return (
    (containsAlphanumericAndSpacesOnly && atLeast10Alphanumeric) ||
    'Invalid policy number'
  );
};

export const validateNotFutureDate = (value) => {
  if (!value || value.length < 10) {
    return 'Invalid date';
  }
  const date = dayjs(value, 'YYYY-MM-DD');
  if (!date.isValid()) {
    return 'Invalid date';
  }

  if (date.isAfter(dayjs())) {
    return 'Future date not allowed';
  }

  return true;
};

export const validateFiles = (files) => {
  const anyUnsupported = files.some((f) => !f.isSupported);
  const anyTooBig = files.some((f) => f.isTooBig);

  if (anyTooBig || anyUnsupported) {
    return 'An uploaded file is not supported or is too big.';
  }

  if (files.length > config.files.maxNumber) {
    return 'Max files exceeded.';
  }

  return true;
};

export const validateNotEmpty = (value = '') => {
  if (value.trim().length < 1) {
    return 'Required';
  }

  return true;
};

export const validateStreetNumber = (value = 0) => {
  if (value === '' || /^[0-9]+$/.test(value)) return true;
  return false;
};

export const validateHarvestNumber = (value = 0) => {
  if (value === '' || /^[0-9]+$/.test(value)) {
    const number = parseInt(value, 10);
    if (number < 2000) return 'El año de cosecha debe ser mayor a 2000';
    const currentYear = new Date().getFullYear();
    if (number > currentYear)
      return `El año de cosecha debe ser menor o igual a ${currentYear}`;
    return true;
  }
  return false;
};

export const validateQuantityOfProductNumber = (value = 0) => {
  if (value === '' || /^[0-9]+(\.[0-9]+)?$/.test(value)) return true;
  return false;
};
