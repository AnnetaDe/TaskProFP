import { useForm } from 'react-hook-form';
import css from './AuthForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';

const AuthForm = ({
  registerForm = false,
  loginForm = false,
  scheme,
  onSubmitThunk,
}) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: registerForm
      ? { username: '', email: '', password: '' }
      : { email: '', password: '' },
    resolver: yupResolver(scheme),
    mode: 'onChange',
  });
  const onSubmit = data => {
    console.log(data);
    console.log('submit');
    dispatch(onSubmitThunk(data));
    reset();
  };

  return (
    <form
      className={css.formStyle}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="nope"
    >
      {registerForm && (
        <InputField
          type="text"
          name="username"
          placeholder="Enter your name"
          register={register}
          errors={errors}
        />
      )}
      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
      />
      <InputPassword
        name="password"
        register={register}
        errors={errors}
      />
      <Button
        className={css.buttonStyles}
        type="submit"
        buttonText={registerForm ? 'Register Now' : 'Log In Now'}
      />
    </form>
  );
};

export default AuthForm;
