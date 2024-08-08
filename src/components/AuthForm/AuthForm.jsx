import { useForm } from 'react-hook-form';
import { useState } from 'react';
import css from './AuthForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import icon from '../../images/icons.svg';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';

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

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = data => {
    console.log(data);
    console.log('submit');
    dispatch(onSubmitThunk(data));
    reset();
  };

  return (
    <div className={css.background}>
      {/* {isLoading && <Loader />} */}
      <div className={css.formWrapper}>
        <ul className={css.authNav}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? css.authLink
                  : `${css.activeAuthLink} ${css.authLink}`
              }
              to="/auth/register"
            >
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? css.authLink
                  : `${css.activeAuthLink} ${css.authLink}`
              }
              to="/auth/login"
            >
              Log in
            </NavLink>
          </li>
        </ul>

        <form
          className={css.formStyle}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="nope"
        >
          {registerForm && (
            <label>
              <InputField
                type="text"
                name="username"
                placeholder="Enter your name"
                register={register}
              />
              <p className={css.errorStyles}>{errors.name?.message}</p>
            </label>
          )}
          <label>
            <InputField
              type="email"
              name="email"
              placeholder="Enter your email"
              register={register}
            />
            <p className={css.errorStyles}>{errors.email?.message}</p>
          </label>
          <label>
            <div className={css.passwordContainer}>
              <InputField
                type={passwordShown ? 'text' : 'password'}
                placeholder="Create a password"
                name="password"
                register={register}
              />
              <button
                type="button"
                className={css.buttonShowPassword}
                onClick={togglePasswordVisibility}
              >
                <svg width="20px" height="20px">
                  <use href={icon + '#icon-eye'}></use>
                </svg>
              </button>
            </div>
            <p className={css.errorStyles}>{errors.password?.message}</p>
          </label>
          <Button
            className={css.buttonStyles}
            type="submit"
            buttonText={registerForm ? 'Register Now' : 'Log In Now'}
          />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
