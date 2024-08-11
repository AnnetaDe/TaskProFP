import s from './BoardModal.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputField from '../../InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import icon from '../../../images/icons.svg';
import { Button } from '../../Button/Button';
import IconsList from './IconsList/IconsList';
import BgcList from './BgcList/BgcList';
import { useState } from 'react';
import Select from 'react-select';
const BoardModal = ({
  create,
  edit,
  title,
  onSubmitThunk,
  scheme,
  icons,
  chosenIcons,
  backGrounds,
  chosenBackGrounds,
}) => {
  const dispatch = useDispatch();

  const [selectedIcon, setSelectedIcon] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: create
      ? { title: '', icons: '', background: '' }
      : { title: title, icons: '', background: '' },
    resolver: yupResolver(scheme),
    mode: 'onChange',
  });
  const onSubmit = data => {
    const formData = {
      ...data,
      icon: selectedIcon,
    };
    dispatch(onSubmitThunk(formData));
    reset();
  };


  return (
    <form
      className={s.form_styles}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="nope"
    >
      <InputField
        type="text"
        name="title"
        placeholder="Title"
        register={register}
        errors={errors}
      />

      <section>
        <h2>Icons</h2>
        <IconsList selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
      </section>
      <section>
        <h2>Background</h2>
        <BgcList backGrounds={backGrounds} />
      </section>
      <Button
        className={s.btn}
        buttonText={create ? 'Create' : 'Edit'}
        icon={`${icon}#icon-plus-small`}
      />
    </form>
  );
};

export default BoardModal;
