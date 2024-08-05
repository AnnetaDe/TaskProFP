import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RegistrationSchame } from '../../schames/AuthSchames';
import css from './RegistrationForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/user/userOperations';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/user/userSelectors';
import icon from '../../images/icons.svg';

const RegistrationForm = () => {
  const dispatch = useDispatch(); // from redux
  const isLoading = useSelector(selectIsLoading);
  console.log(isLoading);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(RegistrationSchame),
    mode: 'onChange',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = data => {
    console.log(data);
    dispatch(registerThunk(data));
    reset();
  };

  return (
    <div className={css.background}>
      {/* {isLoading && <Loader />} */}
      <div className={css.formWrapper}>
        <ul className={css.authNav}>
          <li>
            <p className={css.authLink}>Registration</p>
          </li>
          <li>
            <NavLink className={css.activeAuthLink} to={`/auth/login`}>
              Log in
            </NavLink>
          </li>
        </ul>

        <form
          className={css.formStyle}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="nope"
        >
          <label>
            <input
              className={css.inputStyles}
              type="username"
              name="username"
              placeholder="Enter your name"
              {...register('username')}
            />
            <p className={css.errorStyles}>{errors.name?.message}</p>
          </label>
          <label>
            <input
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
                className={css.inputStyles}
                type={passwordShown ? 'text' : 'password'}
                placeholder="Create a password"
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
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
