import { useState } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { useErrorHandling } from './';

const useForm = ({ onError, ...hookFormOptions } = {}) => {
  const handleError = useErrorHandling();
  const [formError, setFormError] = useState(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const {
    handleSubmit: defaultHandleSubmit,
    formState,
    ...hookForm
  } = useHookForm(hookFormOptions);

  const handleSubmit = (cb) =>
    defaultHandleSubmit(async (...args) => {
      try {
        setFormError(null);
        await cb(...args);
        setIsSubmitSuccessful(true);
      } catch (err) {
        setIsSubmitSuccessful(false);

        const defaultOnError = async (e = err) => {
          const error = await handleError(e);
          setFormError(error);
        };

        if (onError) {
          await onError({
            err,
            setFormError,
            defaultOnError,
          });
        } else {
          await defaultOnError();
        }
      }
    });

  return {
    ...hookForm,
    formState: new Proxy(formState, {
      get: (target, prop) =>
        prop === 'isSubmitSuccessful' ? isSubmitSuccessful : target[prop],
    }),
    formError,
    setFormError,
    handleSubmit,
  };
};

export default useForm;
