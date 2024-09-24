export const errors = status => {
  const errorMessages = {
    400: 'Invalid email or password',
    401: 'Invalid email or password',
    403: 'Please verify your email address',
    500: 'Server error',
  };

  return errorMessages[status] || 'Unknown error';
};
