import { useForm } from 'react-hook-form';
import css from './AuthForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { selectIsVerified } from '../../redux/user/userSelectors';
import { useEffect } from 'react';
import {
  selectModal,
  selectResendVerifyEmailModal,
} from '../../redux/modal/modalSelector';
import {
  closeResendVerifyEmailModal,
  openModal,
  openResendVerifyEmailModal,
} from '../../redux/modal/modalSlice';
import { createPortal } from 'react-dom';
import Modal from '../../components/Modal/Modal';
import EmailResendModal from '../EmailResendModal/EmailResendModal';
import { setIsVerified } from '../../redux/user/userSlice';

const AuthForm = ({
  registerForm = false,
  loginForm = false,
  scheme,
  onSubmitThunk,
}) => {
  const isVerified = useSelector(selectIsVerified);
  const isResendVerifyEmailModalOpen = useSelector(
    selectResendVerifyEmailModal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVerified === false) {
      dispatch(openResendVerifyEmailModal());

      console.log('Resending email...');

      dispatch(setIsVerified());
    }
  }, [isVerified, dispatch]);

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
    dispatch(onSubmitThunk(data));
    reset();
  };

  return (
    <>
      {isResendVerifyEmailModalOpen &&
        createPortal(
          <Modal
            isOpen={openResendVerifyEmailModal}
            closeModal={closeResendVerifyEmailModal}
            title={'Email verification is required'}
          >
            <EmailResendModal />
          </Modal>,
          document.getElementById('modal-root')
        )}
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
        <InputPassword name="password" register={register} errors={errors} />
        <Button
          className={css.buttonStyles}
          type="submit"
          buttonText={registerForm ? 'Register Now' : 'Log In Now'}
        />
      </form>
    </>
  );
};

export default AuthForm;
