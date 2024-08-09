import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './UserProfile.module.css';
import sprite from '../../images/icons.svg';
import { editProfile } from '../../redux/userProfile/userProfileOperations';
import { UserProfileSchames } from '../../schames/UserProfileSchames';

const UserProfile = ({ onClose }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(user.avatarURL);
  const [localAvatar, setLocalAvatar] = useState(null);
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
    },
    resolver: yupResolver(UserProfileSchames),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeAvatar = event => {
    const file = event.target.files[0];
    setAvatar(file);
    setLocalAvatar(URL.createObjectURL(file));
    setAvatarUploaded(true);
  };

  const onSubmit = data => {
    const { name, email, password } = data;
    const updatedProfile = {
      name,
      email,
      ...(password && { password }),
      ...(avatar && { avatar }),
    };

    dispatch(editProfile(editProfile));
    onClose();
  };

  return (
    <div className={css.modal}>
      <h2 className={css.title}>Edit profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label className={css.label}>
          <input
            className={css.inputNameImg}
            type="file"
            {...register('avatar')}
            onChange={handleChangeAvatar}
          />
          {!localAvatar && user.avatarURL === '' ? (
            <div className={css.imgBackground}>
              <svg width="68" height="68" className={css.img}>
                <use xlinkHref={`${sprite}#icon-user`} />
              </svg>
              <div className={css.plusIconBackground}>
                <svg width="10" height="10" className={css.plusIcon}>
                  <use xlinkHref={`${sprite}#icon-plus-small`} />
                </svg>
              </div>
            </div>
          ) : (
            <div className={css.imgBackground}>
              <img
                src={localAvatar ? localAvatar : user.avatarURL}
                className={css.imgUser}
                alt="avatar"
              />
              <div className={css.plusIconBackground}>
                <svg width="10" height="10" className={css.plusIcon}>
                  <use xlinkHref={`${sprite}#icon-x-close`} />
                </svg>
              </div>
            </div>
          )}
        </label>
        <label className={css.label}>
          <input className={css.inputName} type="text" {...register('name')} />
          {errors.name && (
            <div className={css.inputError}>{errors.name.message}</div>
          )}
        </label>
        <label className={css.label}>
          <input
            className={css.inputName}
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <div className={css.inputError}>{errors.email.message}</div>
          )}
        </label>
        <label className={css.label}>
          <input
            className={css.inputName}
            type={passwordVisible ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
          />
          {errors.password && (
            <div className={css.inputError}>{errors.password.message}</div>
          )}
          <span
            className={css.passwordToggle}
            onClick={togglePasswordVisibility}
          >
            <svg width="18" height="18" className={css.fieldIcon}>
              <use xlinkHref={`${sprite}#icon-eye`} />
            </svg>
          </span>
        </label>
        <button type="submit" className={css.btnSend}>
          Send
        </button>
      </form>
    </div>
  );
};

UserProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UserProfile;
