import * as yup from 'yup';
const emailSchame =
  /^([A-Za-z0-9_-]+.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/;
const nameSchame = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const passwordSchame = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
// Regex for password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters
const fileSchema = yup
  .mixed()
  .test('fileType', 'Unsupported file format', value => {
    if (!value) return true;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(value.type);
  })
  .test('fileSize', 'File too large', value => {
    if (!value) return true;
    const maxSize = 5 * 1024 * 1024;
    return value.size <= maxSize;
  });

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
    username: yup
      .string()
      .required('Username is required')
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


  export const EditUserScheme = yup
  .object({
    avatar: fileSchema,
    username: yup
      .string()
      .required('Username is required')
      .matches(nameSchame, 'Invalid name format')
      .trim(),
    // email: yup
    //   .string()
    //   .required('Email is required')
    //   .matches(emailSchame, 'Invalid email format')
    //   .trim(),
    // password: yup
    //   .string()
    //   .min(8)
    //   .max(64)
    //   .matches(passwordSchame, 'Invalid password format')
    //   .required('Password is required'),
  })
  .required();