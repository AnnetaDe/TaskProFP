import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUserPreferencesThunk } from '../../redux/user/userOperations';
import InputField from '../InputField/InputField';
import s from './EditModal.module.css';
import { useState } from 'react';
import { EditUserScheme } from '../../schames/AuthSchames';
import { useSelector } from 'react-redux';
import { selectAvatar, selectUserName } from '../../redux/user/userSelectors';
import InputPassword from '../InputPassword/InputPassword';
const EditModal = () => {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);

  console.log(userName, avatar);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {avatar: avatar, username: userName, email: '', password: '' },
    resolver: yupResolver(EditUserScheme),
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
    console.log('submit');
    dispatch(updateUserPreferencesThunk(data));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="nope" className={s.edit_profile_form}>
      <label>
        <InputField
          type="text"
          name="username"
          placeholder="Enter your name"
          register={register}
        />
        <p className={s.errorStyles}>{errors.name?.message}</p>
      </label>
      <label>
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          register={register}
        />
        <p className={s.errorStyles}>{errors.name?.message}</p>
      </label>
      <InputPassword register={register} />
    </form>
  );
};
export default EditModal;
