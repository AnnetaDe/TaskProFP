import { toast } from 'react-toastify';

export const showToast = (message, type = 'info') => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  } else {
    toast.info(message);
  }
};
