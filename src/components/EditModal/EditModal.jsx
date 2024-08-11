import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/modalSlice';
import { updateUserPreferencesThunk } from '../../redux/user/userOperations';
import s from './EditModal.module.css';
import InputField from '../InputField/InputField';
import InputPassword from '../InputPassword/InputPassword';
import { Button } from '../Button/Button';
import icon from '../../images/icons.svg';
import {
  selectAvatar,
  selectUserEmail,
  selectUserName,
} from '../../redux/user/userSelectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditUserScheme } from '../../schames/AuthSchames';
import SvgIconAnonym from '../Header/SvgIconAnonym';

const EditModal = ({ onClose }) => {
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
    },
    resolver: yupResolver(EditUserScheme),
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
    const formData = new FormData();
    selectedAvatar && formData.append('avatar', selectedAvatar);
    console.log(formData);
    formData.append('username', data.username);
    console.log(formData);

    dispatch(updateUserPreferencesThunk(formData));
    console.log(formData);
    onClose();
    reset();
  };

  const handleFileChange = event => {
    console.log('File input change event triggered');
    const file = event.currentTarget.files[0];
    console.log('Selected file:', file);

    if (file) {
      setSelectedAvatar(file);
      console.log('Avatar selected:', file);
    } else {
      console.log('No file selected');
    }
  };
  const inputFileRef = useRef(null);
  const handlePlusButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
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
          {(avatar || selectedAvatar) && (
            <img
              src={
                selectedAvatar ? URL.createObjectURL(selectedAvatar) : avatar
              }
              alt={`Avatar ${userName}`}
            />
          )}
          {!avatar && !selectedAvatar && (
            <SvgIconAnonym
              className={s.svg_anonym}
              fill="var(--user-icon-fill)"
              width="56"
              height="78"
            />
          )}
          <input
            className={s.input_avatar}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="avatar"
            ref={inputFileRef}
          />
          <Button
            small
            width={24}
            height={24}
            icon={`${icon}#icon-plus-small`}
            iconSize="10"
            className={s.plus_btn}
            onClick={handlePlusButtonClick}
          />
        </label>
      </div>
      <InputField
        type="text"
        name="username"
        placeholder="Enter your name"
        register={register}
        errors={errors}
      />
      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        disabled
        errors={errors}
      />
      <InputPassword
        disabled
        defaultValue={userName}
        errors={errors}
        name="password"
      />
      <Button buttonText="Send" type="submit" />
    </form>
  );
};

export default EditModal;

// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';

// import InputField from '../InputField/InputField';
// import s from './EditModal.module.css';
// import { useState } from 'react';
// import { EditUserScheme } from '../../schames/AuthSchames';
// import { useSelector } from 'react-redux';
// import {
//   selectAvatar,
//   selectUserEmail,
//   selectUserName,
// } from '../../redux/user/userSelectors';
// import InputPassword from '../InputPassword/InputPassword';
// import { Button } from '../Button/Button';
// import icon from '../../images/icons.svg';
// import { updateUserPreferencesThunk } from '../../redux/user/userOperations';
// import { closeModal } from '../../redux/modal/modalSlice';
// const EditModal = () => {
//   const dispatch = useDispatch();

//   const userName = useSelector(selectUserName);
//   const avatar = useSelector(selectAvatar);
//   console.log(avatar, 'avatar');

//   const email = useSelector(selectUserEmail);
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const handleCloseModal = () => {
//     dispatch(closeModal());
//   };
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       avatar: avatar,
//       username: userName,
//       // email: email,
//       // password: '',
//     },
//     // resolver: yupResolver(EditUserScheme),
//     mode: 'onChange',
//   });

//   const onSubmit = data => {
//     console.log(data);
//     const formData = new FormData();
//     formData.append('avatar', selectedAvatar);
//     console.log(formData);
//     formData.append('username', data.username);
//     console.log(formData);

//     dispatch(updateUserPreferencesThunk(formData));
//     console.log(formData);
//     handleCloseModal();
//     reset();
//   };
//   const handleFileChange = event => {
//     console.log('File input change event triggered');

//     const file = event.target.files[0];
//     console.log('Selected file:', file);

//     if (file) {
//       setSelectedAvatar(file);
//       console.log('Avatar selected:', file);
//     } else {
//       console.log('No file selected');
//     }
//   };
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       autoComplete="nope"
//       className={s.edit_profile_form}
//     >
//       <div className={s.avatar_wrap}>
//         <label htmlFor="avatar">
//           <img
//             src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : avatar}
//             alt={`Avatar ${userName}`}
//           />
//           <Button
//             small
//             width={24}
//             height={24}
//             icon={`${icon}#icon-plus-small`}
//             iconSize="10"
//             className={s.plus_btn}
//           />
//         </label>
//       </div>
//       <input
//         className={s.input_avatar}
//         type="file"
//         // style={{ display: 'none' }}
//         // onClick={handleFileChange}
//         onChange={handleFileChange}
//         name="avatar"
//         id="avatar"
//         {...register('avatar')}
//       />
//       <label>
//         <InputField
//           type="text"
//           name="username"
//           placeholder="Enter your name"
//           register={register}
//         />
//         <p className={s.errorStyles}>{errors.name?.message}</p>
//       </label>
//       <label>
//         <InputField
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           // register={register}
//           value={email}
//           disabled
//         />
//         <p className={s.errorStyles}>{errors.name?.message}</p>
//       </label>
//       <InputPassword disabled defaultValue={userName} />
//       <Button buttonText="Send" type="submit" />
//     </form>
//   );
// };
// export default EditModal;
