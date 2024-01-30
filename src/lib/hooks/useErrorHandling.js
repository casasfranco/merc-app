// import { useModel } from './';

const handler = async (err, logout) => {
  const statusCode = err?.statusCode ?? err?.response?.status;
  console.log(logout);
  if ([500, 503, 504, 408, 429].includes(statusCode)) {
    return 'We ran into an issue. Please try again in a few minutes.';
  } else if (statusCode === 401) {
    // await logout('/resume');
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
  // const { logout } = useAuth0();
  // const fnol = useModel.fnol();

  const handleError = (err) => handler(err, true);

  return handleError;
};

export default useErrorHandling;
