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
import { BoardForm } from '../../../schames/BoardFormSchemes';
import {
  createBoardThunk,
  updateBoardThunk,
} from '../../../redux/boards/boardsOperations';

const BoardModal = ({ type, title, chosenIcon, chosenBackGround, onClose }) => {
  const dispatch = useDispatch();

  const options = {
    create: {
      scheme: BoardForm,
      onSubmitThunk: createBoardThunk,
      defaultValues: { title: '', icon: '', backgroundImg: '' },
    },
    edit: {
      create: {
        scheme: BoardForm,
        onSubmitThunk: updateBoardThunk,
        defaultValues: {
          title: title,
          icon: chosenIcon,
          backgroundImg: chosenBackGround,
        },
      },
    },
  };

  const [selectedIcon, setSelectedIcon] = useState(options[type].icon);
  const [selectedBgc, setSelectedBgc] = useState(options[type].backgroundImg);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: title, icon: '', backgroundImg: '' },
    resolver: yupResolver(options[type].scheme),
    mode: 'onChange',
  });
  const onSubmit = data => {
    const formData = {
      ...data,
      icon: selectedIcon,
      backgroundImg: selectedBgc,
    };
    dispatch(options[type].onSubmitThunk(formData));
    console.log(formData);
    onClose()
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
        <IconsList
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          register={register}
          name="icon"
        />
      </section>
      <section>
        <h2>Background</h2>
        <BgcList
          selectedBgc={selectedBgc}
          setSelectedBgc={setSelectedBgc}
          register={register}
          name="backgroundImg"
        />
      </section>
      <Button
        className={s.btn}
        type="submit"
        buttonText={type === 'create' ? 'Create' : 'Edit'}
        icon={`${icon}#icon-plus-small`}
      />
    </form>
  );
};

export default BoardModal;
