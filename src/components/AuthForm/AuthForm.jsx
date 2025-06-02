import { useForm } from 'react-hook-form';
import css from './AuthForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  selectError,
  selectNotification,
} from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CheckBox } from './CheckBox';

const AuthForm = ({
  registerForm = false,
  loginForm = false,
  choosenValues,
  scheme,
  onSubmitThunk,
  handleCheckboxChange,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: choosenValues,
    resolver: yupResolver(scheme),
    mode: 'onChange',
  });

  useEffect(() => {
    reset(choosenValues);
  }, [choosenValues, reset]);

  const onSubmit = async data => {
    const response = await dispatch(onSubmitThunk(data)).then(reset());
    return response;
  };

  return (
    <>
      <form
        className={css.formStyle}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="nope"
      >
        {loginForm && <CheckBox onChange={handleCheckboxChange} />}

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
        <InputPassword name="password" register={register} errors={errors} />
        <Button
          className={css.buttonStyles}
          type="submit"
          buttonText={registerForm ? 'Register Now' : 'Log In Test Account'}
        />
      </form>
    </>
  );
};

export default AuthForm;
