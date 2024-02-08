const handler = async (err) => {
  const statusCode = err?.statusCode ?? err?.response?.status;

  if ([500, 503, 504, 408, 429].includes(statusCode)) {
    return 'We ran into an issue. Please try again in a few minutes.';
  } else if (statusCode === 401) {
    sessionStorage.clear();
    return 'Something went wrong. Please try again later.';
  } else {
    return (
      err?.response?.data?.error ??
      err?.response?.data?.Error ??
      err?.response?.data?.Message ??
      'Something went wrong. Please try again later.'
    );
  }
};

const useErrorHandling = () => {
  const handleError = (err) => handler(err);

  return handleError;
};

export default useErrorHandling;
