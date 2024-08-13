import * as yup from 'yup';

export const BoardFormScheme = yup
  .object({
    title: yup
      .string()
      .min(2, 'Title must be at least 2 characters long')
      .max(32, 'Title must be at most 32 characters long')
      .required('Title is required'),
    icon: yup.string().required('Icon is required'),
    backgroundImg: yup.string(),
  })
  .required();
export const CardFormScheme = yup
  .object({
    title: yup
      .string()
      .min(2, 'Title must be at least 2 characters long')
      .max(32, 'Title must be at most 32 characters long')
      .required('Title is required'),
    description: yup.string(),
    priority: yup.string(),
    deadline: yup.string(),
  })
  .required();

export const ColumnFormScheme = yup
  .object({
    title: yup
      .string()
      .min(2, 'Title must be at least 2 characters long')
      .max(32, 'Title must be at most 32 characters long')
      .required('Title is required'),
  })
  .required();
