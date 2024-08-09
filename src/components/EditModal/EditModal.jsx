import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import InputField from '../InputField/InputField';
import s from './EditModal.module.css';
import {  useState } from 'react';
import { EditUserScheme } from '../../schames/AuthSchames';
import { useSelector } from 'react-redux';
import {
  selectAvatar,
  selectUserEmail,
  selectUserName,
} from '../../redux/user/userSelectors';
import InputPassword from '../InputPassword/InputPassword';
import { Button } from '../Button/Button';
import icon from '../../images/icons.svg';
import { updateUserPreferencesThunk } from '../../redux/user/userOperations';

const EditModal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const email = useSelector(selectUserEmail);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: avatar,
      username: userName,
      email: email,
      // password: '',
    },
    resolver: yupResolver(EditUserScheme),
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
    console.log('submit');
    // const formData = new FormData();
    // formData.append('userAvatar', selectedAvatar);
    // formData.append('userName', data.username);
    // console.log(data.username);

    // formData.append('email', data.email);
    // formData.append('password', data.password);
    // dispatch(updateUserPreferencesThunk(formData));
    // console.log(formData);

    reset();
    closeModal();
  };
  const handleFileChange = event => {
    const file = event.target.files[0];
    console.log(file);
    
    if (file) {
      setSelectedAvatar(file);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className={s.edit_profile_form}
    >
      <div className={s.avatar_wrap}>
        <label>
          <img
            src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : avatar}
            alt={`Avatar ${userName}`}
          />
          <input
            className={s.input_avatar}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            name="avatar"
            {...register('avatar')}
          />
          <Button
            small
            width={24}
            height={24}
            icon={`${icon}#icon-plus-small`}
            iconSize="10"
            className={s.plus_btn}
          />
        </label>
      </div>
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
          // register={register}
          value={email}
          disabled
        />
        <p className={s.errorStyles}>{errors.name?.message}</p>
      </label>
      <InputPassword disabled defaultValue={userName} />
      <Button buttonText="Send" type="submit" />
    </form>
  );
};
export default EditModal;
