import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RegistrationSchame } from '../../schames/AuthSchames';
import css from './RegistrationForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';

const RegistrationForm = () => {
  const isLoading = false; // from redux
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
    resolver: yupResolver(RegistrationSchame),
    mode: 'onChange',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = data => {
    console.log(data);
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
              type="name"
              name="name"
              placeholder="Enter your name"
              {...register('name')}
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
