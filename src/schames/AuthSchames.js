import * as yup from 'yup';
const emailSchame =
  /^([A-Za-z0-9_-]+.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/;
const nameSchame = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const passwordSchame = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const LoginSchame = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailSchame, 'Invalid email format'),
    password: yup
      .string()
      .required('Password is required')
      .min(8)
      .max(64)
      .matches(passwordSchame, 'Invalid password format'),
  })
  .required();

export const RegistrationSchame = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .matches(nameSchame, 'Invalid name format')
      .trim(),
    email: yup
      .string()
      .required('Email is required')
      .matches(emailSchame, 'Invalid email format')
      .trim(),
    password: yup
      .string()
      .min(8)
      .max(64)
      .matches(passwordSchame, 'Invalid password format')
      .required('Password is required'),
  })
  .required();
