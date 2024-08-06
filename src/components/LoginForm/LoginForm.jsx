import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LoginSchame } from '../../schames/AuthSchames';
import css from './LoginForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import icon from '../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/user/userOperations';

const LoginForm = () => {
  const isLoading = false; // from redux
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchame),
    mode: 'onChange',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = data => {
    console.log(data);
    dispatch(loginThunk(data));
    reset();
  };

  return (
    <div className={css.background}>
      {/* {isLoading && <Loader />} */}
      <div className={css.formWrapper}>
        <ul className={css.authNav}>
          <li>
            <NavLink className={css.activeAuthLink} to={`/auth/register`}>
              Registration
            </NavLink>
          </li>
          <li>
            <p className={css.authLink}>Log in</p>
          </li>
        </ul>

        <form
          className={css.formStyle}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <label>
            <input
              autoComplete="off"
              className={css.inputStyles}
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            <p className={css.errorStyles}>{errors.email?.message}</p>
          </label>
          <label>
            <div className={css.passwordContainer}>
              <input
                autoComplete="off"
                className={css.inputStyles}
                type={passwordShown ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
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
          <button className={css.buttonStyles} type="submit">
            Log In Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
