import * as yup from 'yup';

export const BoardForm = yup
  .object({
    title: yup
    .string()
    .min(2, 'Title must be at least 2 characters long')
    .max(32, 'Title must be at most 32 characters long')
    .required('Title is required'),
    icon: yup
    .string()
    .required('Icon is required'),
    backgroundImg: yup
    .string()
    // .required('Background is required'),
  })
  .required();
